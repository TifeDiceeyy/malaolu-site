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
  const [hovered, setHovered] = useState(false);
  const aspectPct = ((img.h / img.w) * 100).toFixed(2);

  return (
    <Link
      to={`/blog/${img.slug}`}
      className="block relative overflow-hidden group"
      style={{ marginBottom: "var(--gap)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Aspect-ratio box → zero layout shift */}
      <div style={{ paddingBottom: `${aspectPct}%`, position: "relative" }}>
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: "transform 0.7s ease",
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(10,10,10,0.82) 30%, transparent 80%)"
              : "transparent",
            transition: "background 0.4s ease",
          }}
        >
          <div
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <p
              className="text-[0.55rem] tracking-[0.28em] uppercase mb-1"
              style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
            >
              {img.category}
            </p>
            <p
              className="leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                color: "var(--fg)",
              }}
            >
              {img.title}
            </p>
          </div>
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
        className="px-4 pt-4 pb-32 mx-auto w-full"
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
