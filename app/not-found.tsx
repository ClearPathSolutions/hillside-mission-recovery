import Link from "next/link";
import { site } from "@/lib/site";
import { IconArrow, IconPhone } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink text-white">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
      <div className="container-x relative py-32 text-center">
        <p className="font-display text-7xl text-teal-bright md:text-8xl">404</p>
        <h1 className="mt-4 text-3xl md:text-4xl">This page couldn&apos;t be found.</h1>
        <p className="mx-auto mt-4 max-w-md text-cream/70">
          The page may have moved. Let&apos;s get you back on track — or reach out and we&apos;ll help you
          directly.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Back to home <IconArrow className="h-4 w-4" />
          </Link>
          <a href={site.phoneHref} className="btn btn-light">
            <IconPhone className="h-4 w-4" /> {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
