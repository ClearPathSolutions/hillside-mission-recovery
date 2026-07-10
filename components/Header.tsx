"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, type NavItem } from "@/lib/nav";
import { site } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileSub(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;

  const openWith = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-cream/92 backdrop-blur-md shadow-[0_1px_0_rgba(19,48,42,0.08),0_10px_30px_rgba(19,48,42,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            solid ? "h-16 md:h-[4.5rem]" : "h-20 md:h-24"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center shrink-0" aria-label={site.fullName}>
            <Image
              src={solid ? "/logo-color.png" : "/logo-white.png"}
              alt={site.fullName}
              width={600}
              height={294}
              priority
              className={`w-auto transition-all duration-300 ${solid ? "h-9 md:h-10" : "h-11 md:h-12"}`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {nav.map((item) => (
              <DesktopItem
                key={item.label}
                item={item}
                solid={solid}
                open={openMenu === item.label}
                onOpen={() => openWith(item.label)}
                onClose={scheduleClose}
                active={isActive(pathname, item.href)}
              />
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={site.phoneHref}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                solid ? "text-ink hover:text-teal" : "text-white/90 hover:text-white"
              }`}
            >
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
            <Link href="/admissions" className="btn btn-primary !py-2.5 !px-5 text-sm">
              Verify Insurance
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
                solid ? "text-ink hover:bg-sand" : "text-white hover:bg-white/15"
              }`}
            >
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${
                solid ? "text-ink hover:bg-sand" : "text-white hover:bg-white/15"
              }`}
            >
              <Burger open={mobileOpen} />
            </button>
          </div>
        </div>
      </div>
      </header>

      {/* Mobile menu panel — rendered outside <header> so the header's
          backdrop-blur containing block doesn't collapse this fixed element. */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 origin-top overflow-y-auto overscroll-contain bg-cream transition-all duration-300 ${
          mobileOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="container-x py-4 pb-40" aria-label="Mobile">
          <MobileLink href="/" label="Home" onNavigate={() => setMobileOpen(false)} />
          {nav.map((item) =>
            item.columns ? (
              <div key={item.label} className="border-b border-line/70">
                <button
                  type="button"
                  onClick={() => setMobileSub((s) => (s === item.label ? null : item.label))}
                  aria-expanded={mobileSub === item.label}
                  className="flex w-full items-center justify-between py-3.5 text-left font-display text-xl text-ink"
                >
                  {item.label}
                  <Chevron open={mobileSub === item.label} />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    mobileSub === item.label ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm font-semibold text-teal"
                    >
                      View all {item.label} →
                    </Link>
                    {item.columns.map((col) => (
                      <div key={col.heading} className="mb-3">
                        <p className="mb-1 mt-2 text-xs font-semibold uppercase tracking-widest text-ink/45">
                          {col.heading}
                        </p>
                        <ul>
                          {col.links.map((l) => (
                            <li key={l.href + l.label}>
                              <Link
                                href={l.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-lg py-2 pl-1 text-[0.95rem] text-ink/80 active:bg-sand"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <MobileLink key={item.label} href={item.href} label={item.label} onNavigate={() => setMobileOpen(false)} />
            )
          )}
        </nav>

        {/* Sticky mobile CTA footer */}
        <div className="fixed inset-x-0 bottom-0 border-t border-line bg-cream/95 backdrop-blur-md px-5 py-4">
          <div className="flex gap-3">
            <a href={site.phoneHref} className="btn btn-ghost flex-1">
              <PhoneIcon className="h-4 w-4" /> Call Now
            </a>
            <Link href="/admissions" className="btn btn-primary flex-1" onClick={() => setMobileOpen(false)}>
              Verify Insurance
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function DesktopItem({
  item,
  solid,
  open,
  onOpen,
  onClose,
  active,
}: {
  item: NavItem;
  solid: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  active: boolean;
}) {
  const base = `relative px-3.5 py-2 text-[0.93rem] font-medium rounded-full transition-colors ${
    solid ? "text-ink/85 hover:text-ink hover:bg-sand/70" : "text-white/85 hover:text-white hover:bg-white/10"
  } ${active ? (solid ? "text-ink" : "text-white") : ""}`;

  if (!item.columns) {
    return (
      <Link href={item.href} className={base}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Link
        href={item.href}
        className={`${base} inline-flex items-center gap-1`}
        aria-expanded={open}
        onFocus={onOpen}
      >
        {item.label}
        <Chevron open={open} className="h-3 w-3 opacity-60" />
      </Link>

      <div
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
          open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-1 pointer-events-none"
        }`}
      >
        <div
          className="rounded-2xl border border-line bg-white p-5 shadow-[0_20px_60px_rgba(19,48,42,0.16)]"
          style={{ minWidth: item.columns.length > 2 ? "44rem" : "30rem" }}
        >
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${item.columns.length}, minmax(0,1fr))` }}>
            {item.columns.map((col) => (
              <div key={col.heading}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal">{col.heading}</p>
                <ul className="space-y-0.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="block rounded-lg px-2 py-1.5 text-sm text-ink/80 transition-colors hover:bg-cream hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileLink({ href, label, onNavigate }: { href: string; label: string; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="block border-b border-line/70 py-3.5 font-display text-xl text-ink"
    >
      {label}
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5c.5 0 .95.32 1.1.8l1 3.1a1.2 1.2 0 0 1-.3 1.2L7 10.7a12 12 0 0 0 6.3 6.3l1.1-1.3c.32-.37.83-.5 1.28-.33l3 1a1.15 1.15 0 0 1 .8 1.1V20c0 .83-.67 1.5-1.5 1.5C10.6 21.5 2.5 13.4 2.5 5 2.5 4.17 3.17 3.5 4 3.5h2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6">
      <span
        className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
          open ? "top-2.5 rotate-45" : "top-1"
        }`}
      />
      <span
        className={`absolute left-0 top-2.5 h-0.5 w-6 rounded bg-current transition-all duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
          open ? "top-2.5 -rotate-45" : "top-4"
        }`}
      />
    </div>
  );
}

function Chevron({ open, className = "h-4 w-4" }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`${className} transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
