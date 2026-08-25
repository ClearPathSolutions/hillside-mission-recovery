/**
 * Client-side attribution store.
 *
 * Three separate problems this solves, all of which failed silently before:
 *
 *  1. The campaign was read from `location.search` at submit time, so anyone who
 *     landed on an ad and then read a second page before converting arrived as
 *     direct traffic. Paid spend appeared to convert at zero.
 *  2. First touch was recorded *inside* the submit handler, so `landingPageUrl`
 *     was whichever page held the form — never the ad's entry page.
 *  3. The CTM session id was not collected at all, so CTM had no visit to file a
 *     lead against even when the number swap worked.
 *
 * localStorage, not sessionStorage: a second tab is the same visit, and CTM's own
 * `__ctmid` cookie lasts 30 days, so a shorter window here would under-attribute
 * relative to the call tracking it is supposed to line up with.
 */

const CAMPAIGN_KEY = "hmr.campaign.v1";
const VISIT_KEY = "hmr.visit.v1";

/** Matches CTM's 30-day `__ctmid` cookie so form and call attribution agree. */
const CAMPAIGN_TTL_MS = 30 * 24 * 60 * 60 * 1000;
/** A gap longer than this is a new visit, not a continuation of the old one. */
const VISIT_IDLE_MS = 30 * 60 * 1000;

/**
 * Click identifiers, not just utm_*. `gbraid`/`wbraid` are what Google sends
 * instead of `gclid` under iOS and consent mode, and CTM account 264810's own
 * routing rules key on both — so without them CTM attributes those clicks and
 * Clarion cannot.
 */
const CAMPAIGN_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

export type Campaign = Record<string, string>;

type CampaignRecord = {
  /** The raw campaign parameters exactly as they arrived. */
  params: Campaign;
  /** The page the campaign actually landed on — not the page holding the form. */
  landingPageUrl: string;
  /** External referrer at the moment of the click, if any. */
  referrer: string | null;
  at: number;
};

type VisitRecord = {
  landingPageUrl: string;
  referrer: string | null;
  startedAt: number;
  lastSeenAt: number;
  /** Optional: records written before this field existed simply read as 0. */
  pageviews?: number;
};

export type Attribution = {
  pageUrl: string | null;
  landingPageUrl: string | null;
  referrer: string | null;
  utm: Record<string, string> | null;
  gclid: string | null;
  /**
   * CTM's own session id: 24 hex characters, no dashes. `null` when CTM has not
   * loaded — never a substitute id, which would file the lead against a visit
   * that does not exist.
   */
  ctmVisitorSid: string | null;
};

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private-mode or quota. Attribution degrades; the lead still sends.
  }
}

/** The referrer only counts when it is external — an internal one is just the previous page. */
function externalReferrer(): string | null {
  const ref = document.referrer || "";
  if (!ref) return null;
  try {
    return new URL(ref).origin === location.origin ? null : ref;
  } catch {
    return null;
  }
}

/** Campaign parameters present in the current URL, if this is a fresh ad click. */
function campaignFromUrl(): Campaign {
  const found: Campaign = {};
  let params: URLSearchParams | null = null;
  try {
    params = new URLSearchParams(location.search);
  } catch {
    return found;
  }
  for (const key of CAMPAIGN_PARAMS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, 500);
  }
  return found;
}

function liveCampaign(): CampaignRecord | null {
  const stored = readJson<CampaignRecord>(CAMPAIGN_KEY);
  if (!stored || typeof stored.at !== "number") return null;
  if (Date.now() - stored.at > CAMPAIGN_TTL_MS) return null;
  return stored;
}

/** Persist a fresh ad click, if the current URL carries one. */
function captureCampaign(now: number): void {
  const fresh = campaignFromUrl();
  if (!Object.keys(fresh).length) return;
  // A fresh click always wins. That is a new campaign, not a continuation of an
  // older one, and crediting the earlier ad would misreport both.
  writeJson(CAMPAIGN_KEY, {
    params: fresh,
    landingPageUrl: location.href,
    referrer: externalReferrer(),
    at: now,
  } satisfies CampaignRecord);
}

/**
 * Open or extend the current visit.
 *
 * `countPageview` is false when this runs at submit time: a submission is not a
 * pageview, and counting it would inflate every converting visit by one.
 */
function touchVisit(now: number, countPageview: boolean): VisitRecord {
  const visit = readJson<VisitRecord>(VISIT_KEY);
  const continuing = visit && typeof visit.lastSeenAt === "number" && now - visit.lastSeenAt <= VISIT_IDLE_MS;

  const next: VisitRecord = continuing
    ? { ...visit, lastSeenAt: now, pageviews: (visit.pageviews ?? 0) + (countPageview ? 1 : 0) }
    : {
        landingPageUrl: location.href,
        referrer: externalReferrer(),
        startedAt: now,
        lastSeenAt: now,
        pageviews: countPageview ? 1 : 0,
      };

  writeJson(VISIT_KEY, next);
  return next;
}

/**
 * Record a pageview. Must run on every route change, not just first paint —
 * otherwise a client-side navigation away from the ad's entry page is invisible
 * and the landing page reverts to whatever page the form sits on.
 */
export function recordPageview(): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  captureCampaign(now);
  touchVisit(now, true);
}

/**
 * Refresh the store at submit time without counting a pageview. Covers the
 * visitor who lands directly on a form page and submits before any route change.
 */
function ensureVisit(): VisitRecord | null {
  if (typeof window === "undefined") return null;
  const now = Date.now();
  captureCampaign(now);
  return touchVisit(now, false);
}

/** CTM's session id: 24 hex characters, no dashes. Anything else is not CTM's. */
const CTM_ID = /^[0-9a-f]{24}$/i;

type CtmWindow = Window & { __ctm?: { config?: { sid?: unknown } } };

/**
 * Read CTM's session id from `t.js` in memory, falling back to the first-party
 * `__ctmid` cookie that `t.js` reconciles against on load.
 *
 * Deliberately not cached in sessionStorage: CTM already persists this for 30
 * days in a cookie that survives a full page load and a second tab, so a local
 * copy could only ever be staler.
 */
export function ctmVisitorSid(): string | null {
  if (typeof window === "undefined") return null;

  let sid: string | null = null;
  try {
    const raw = (window as CtmWindow).__ctm?.config?.sid;
    sid = typeof raw === "string" ? raw : null;
  } catch {
    // t.js blocked or partially initialised.
  }

  let cookie: string | null = null;
  try {
    const match = document.cookie.match(/(?:^|;\s*)__ctmid=([^;]*)/);
    cookie = match ? decodeURIComponent(match[1]) : null;
  } catch {
    // Cookies unavailable.
  }

  if (sid && CTM_ID.test(sid)) return sid;
  if (cookie && CTM_ID.test(cookie)) return cookie;
  // Never fall back to an id of our own. The server re-checks the shape and
  // logs; `null` is the correct answer when CTM's id is genuinely unavailable.
  return sid || cookie || null;
}

/**
 * Attribution for a lead submission, read from the store rather than the URL so
 * it survives any number of pageviews between the ad click and the form.
 */
export function attributionForSubmit(): Attribution {
  if (typeof window === "undefined") {
    return { pageUrl: null, landingPageUrl: null, referrer: null, utm: null, gclid: null, ctmVisitorSid: null };
  }

  const visit = ensureVisit();
  const campaign = liveCampaign();
  const params: Campaign = campaign?.params ?? {};

  const utm: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (key.startsWith("utm_")) utm[key.slice(4)] = value;
  }

  return {
    pageUrl: location.href,
    // The campaign's own entry page outranks the current visit's: a visitor who
    // clicked an ad on Monday and returned directly on Wednesday should still
    // credit the ad's landing page.
    landingPageUrl: campaign?.landingPageUrl ?? visit?.landingPageUrl ?? location.href,
    referrer: campaign?.referrer ?? visit?.referrer ?? null,
    utm: Object.keys(utm).length ? utm : null,
    // wbraid/gbraid are gclid substitutes, so they belong in the same field
    // rather than one Clarion has never been asked to read.
    gclid: params.gclid ?? params.wbraid ?? params.gbraid ?? null,
    ctmVisitorSid: ctmVisitorSid(),
  };
}

/** Non-Google click ids, forwarded separately so nothing collected is dropped. */
export function auxiliaryClickIds(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  const params = liveCampaign()?.params ?? {};
  const aux: Record<string, string> = {};
  for (const key of ["fbclid", "msclkid", "gbraid", "wbraid"]) {
    if (params[key]) aux[key] = params[key];
  }
  return Object.keys(aux).length ? aux : null;
}

/**
 * Rich session context for a lead submission.
 *
 * This is supplementary. Everything needed to attribute the lead is already in
 * the flat fields `attributionForSubmit()` returns — `session` adds the shape of
 * the visit around them: how long the person spent, how many pages they read,
 * what the campaign looked like in full.
 *
 * Deliberately NOT included: the list of pages visited. On a treatment site a
 * path discloses what someone is seeking help for, and a page-by-page trail
 * turns an admissions enquiry into a diagnosis history in a third-party CRM.
 * The current page and the landing page are already sent and are justifiable on
 * their own; a full trail is not, so it is left out until someone asks for it
 * with that trade-off in view.
 *
 * The server rebuilds this object before forwarding it — see `sanitizeSession`
 * in lib/lead-delivery.ts. Nothing here is trusted on arrival.
 */
export type SessionPayload = {
  version: 1;
  visit: {
    startedAt: string;
    lastSeenAt: string;
    durationMs: number;
    pageviews: number;
  };
  landing: {
    url: string | null;
    referrer: string | null;
  };
  campaign: {
    /** Every parameter as it arrived, including ones folded into `utm`/`gclid`. */
    params: Campaign;
    capturedAt: string;
    /** True when the campaign predates the current visit — a returning click. */
    priorVisit: boolean;
  } | null;
  ctm: { visitorSid: string | null };
  client: {
    timezone: string | null;
    language: string | null;
    screen: string | null;
    viewport: string | null;
  };
};

function iso(ms: number): string {
  return new Date(ms).toISOString();
}

/** Best-effort environment details. Any of these can be unavailable. */
function clientInfo(): SessionPayload["client"] {
  const safe = <T>(fn: () => T): T | null => {
    try {
      return fn();
    } catch {
      return null;
    }
  };
  return {
    timezone: safe(() => Intl.DateTimeFormat().resolvedOptions().timeZone) ?? null,
    language: safe(() => navigator.language) ?? null,
    screen: safe(() => `${screen.width}x${screen.height}`) ?? null,
    viewport: safe(() => `${window.innerWidth}x${window.innerHeight}`) ?? null,
  };
}

/** Build the session object sent alongside a lead. `null` before hydration. */
export function sessionPayload(): SessionPayload | null {
  if (typeof window === "undefined") return null;

  const visit = ensureVisit();
  if (!visit) return null;
  const campaign = liveCampaign();

  return {
    version: 1,
    visit: {
      startedAt: iso(visit.startedAt),
      lastSeenAt: iso(visit.lastSeenAt),
      durationMs: Math.max(0, visit.lastSeenAt - visit.startedAt),
      pageviews: visit.pageviews ?? 0,
    },
    landing: {
      // Mirrors attributionForSubmit: the campaign's entry page outranks the
      // current visit's, so the two never disagree.
      url: campaign?.landingPageUrl ?? visit.landingPageUrl ?? null,
      referrer: campaign?.referrer ?? visit.referrer ?? null,
    },
    campaign: campaign
      ? {
          params: campaign.params,
          capturedAt: iso(campaign.at),
          priorVisit: campaign.at < visit.startedAt,
        }
      : null,
    ctm: { visitorSid: ctmVisitorSid() },
    client: clientInfo(),
  };
}
