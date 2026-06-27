import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { feedImages } from "../data/blog";

// Stable shuffle so the grid doesn't reorder on re-render
const shuffled = [...feedImages].sort((a, b) => {
  const order: Record<string, number> = {
    "/assets/blog/IMG_4575.jpg": 0,
    "/assets/blog/IMG_1697.jpg": 1,
    "/assets/blog/IMG_2910.jpg": 2,
    "/assets/blog/IMG_8108.jpg": 3,
    "/assets/blog/IMG_4578.jpg": 4,
    "/assets/blog/IMG_9060.jpg": 5,
    "/assets/blog/IMG_7745.jpg": 6,
    "/assets/blog/IMG_9014.jpg": 7,
    "/assets/blog/IMG_9062.jpg": 8,
  };
  return (order[a.src] ?? 99) - (order[b.src] ?? 99);
});

function MasonryCard({ img }: { img: (typeof feedImages)[0] }) {
  const aspectPct = ((img.h / img.w) * 100).toFixed(2);

  return (
    <Link
      to={`/blog/${img.slug}`}
      className="block relative overflow-hidden group"
      style={{ marginBottom: "var(--gap)" }}
    >
      {/* Aspect-ratio box → zero layout shift */}
      <div style={{ paddingBottom: `${aspectPct}%`, position: "relative" }}>
        {/* Image — dims on hover (desktop) */}
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-[0.12]"
        />

        {/* Desktop hover overlay — full dark panel with all details */}
        <div
          className="absolute inset-0 flex-col justify-center px-6 py-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex"
          style={{ background: "rgba(8,8,8,0.88)" }}
        >
          <p
            className="text-[0.55rem] tracking-[0.3em] uppercase mb-3"
            style={{ color: "#ffffff", fontFamily: "var(--font-ui)" }}
          >
            {img.category}
          </p>
          <p
            className="leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
              color: "#ffffff",
            }}
          >
            {img.title}
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{
              color: "#ffffff",
              fontFamily: "var(--font-ui)",
              fontWeight: 300,
            }}
          >
            {img.excerpt}
          </p>
          <span
            className="mt-6 text-[0.55rem] tracking-[0.28em] uppercase"
            style={{ color: "#ffffff", fontFamily: "var(--font-ui)" }}
          >
            View post ↗
          </span>
        </div>

        {/* Mobile caption — always visible at bottom of image */}
        <div
          className="md:hidden absolute bottom-0 left-0 right-0 px-4 py-4"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.4) 70%, transparent 100%)",
          }}
        >
          <p
            className="text-[0.5rem] tracking-[0.28em] uppercase mb-1"
            style={{ color: "#ffffff", fontFamily: "var(--font-ui)" }}
          >
            {img.category}
          </p>
          <p
            className="leading-snug"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "0.95rem",
              color: "#ffffff",
            }}
          >
            {img.title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
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
          <p
            className="text-[0.6rem] tracking-[0.3em] uppercase mb-5"
            style={{ color: "#ffffff", fontFamily: "var(--font-ui)" }}
          >
            Journal
          </p>
          <h1
            className="leading-[0.88]"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(3.5rem, 11vw, 8rem)",
              color: "#ffffff",
              letterSpacing: "-0.01em",
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
            }}
          >
            Work &amp;
            <br />
            Process
          </h1>
          <div className="mt-8 flex items-center gap-4" aria-hidden="true">
            <span
              className="block h-px w-10"
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            />
            <span
              className="text-[0.58rem] tracking-[0.28em] uppercase"
              style={{ color: "#ffffff", fontFamily: "var(--font-ui)" }}
            >
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ── Scrapbook masonry feed ── */}
      <div
        className="px-4 pt-4 pb-16 md:pb-32 mx-auto w-full"
        style={{ maxWidth: "var(--maxw)" }}
      >
        {/* CSS columns masonry — 3 cols desktop, 2 tablet, 1 mobile */}
        <div
          style={{ columnGap: "var(--gap)" }}
          className="[column-count:1] sm:[column-count:2] lg:[column-count:3]"
        >
          {shuffled.map((img) => (
            <div key={img.src} style={{ breakInside: "avoid" }}>
              <MasonryCard img={img} />
            </div>
          ))}
        </div>

        {/* Footer label */}
        <div className="pt-16" style={{ borderTop: "1px solid var(--line)" }}>
          <p
            className="text-[0.6rem] tracking-[0.25em] uppercase"
            style={{ color: "#ffffff", fontFamily: "var(--font-ui)" }}
          >
            More entries coming soon
          </p>
        </div>
      </div>
    </>
  );
}
