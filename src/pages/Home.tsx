import { useEffect, useState } from "react";
import { site } from "../data/site";
import QuoteRotator from "../components/QuoteRotator";
import FeedGrid from "../components/feed/FeedGrid";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const [first, second] = site.name.split(" ");

  return (
    <>
      <h1 className="sr-only">
        {site.name} — {site.role}
      </h1>

      {/* ── Hero ── */}
      <section
        className="flex flex-col justify-end px-6 pb-14"
        style={{ minHeight: "100svh", paddingTop: "96px" }}
      >
        <div
          className={[
            "motion-safe:transition-all motion-safe:duration-[900ms] motion-safe:ease-out",
            visible
              ? "opacity-100 translate-y-0"
              : "motion-safe:opacity-0 motion-safe:translate-y-6",
          ].join(" ")}
        >
          {/* Name */}
          <p
            aria-hidden="true"
            className="leading-[0.88] select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "var(--hero-size)",
              color: "#ffffff",
              letterSpacing: "0.01em",
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
            }}
          >
            {first}
            <br />
            {second}
          </p>

          {/* Role */}
          <p
            className="mt-5 text-[0.62rem] tracking-[0.25em] uppercase"
            style={{ color: "#ffffff", fontFamily: "var(--font-ui)" }}
          >
            {site.role}
          </p>

          {/* Scroll indicator */}
          <div className="mt-8 flex items-center gap-4" aria-hidden="true">
            <span
              className="block h-px w-10"
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            />
            <span
              className="text-[0.58rem] tracking-[0.28em] uppercase"
              style={{ color: "#ffffff", fontFamily: "var(--font-ui)" }}
            >
              Work
            </span>
          </div>
        </div>
      </section>

      {/* ── Feed ── */}
      <div
        className="px-6 pb-32 mx-auto w-full"
        style={{ maxWidth: "var(--maxw)" }}
      >
        <QuoteRotator />
        <FeedGrid />
      </div>
    </>
  );
}
