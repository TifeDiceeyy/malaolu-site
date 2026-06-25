import { site } from "../data/site";

// TODO(owner): replace "" with the public path to a portrait/studio image
const HERO_IMAGE: string = "";

type ExternalNavItem = Extract<(typeof site.nav)[number], { href: string }>;
const suavee = site.nav.find(
  (item): item is ExternalNavItem => item.label === "Suavee",
);

export default function About() {
  return (
    <article style={{ fontFamily: "var(--font-ui)" }}>
      {/* ── Hero: full-bleed image + bio overlay ── */}
      <section
        className="relative min-h-[85vh] flex items-end"
        style={{ background: "var(--bg)" }}
      >
        {/* Background — dark placeholder until owner supplies portrait */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ background: "var(--line)" }}
        >
          {HERO_IMAGE && (
            <img
              src={HERO_IMAGE}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Bio */}
        <div className="relative z-10 px-8 pb-14 w-full max-w-2xl">
          <h1
            className="text-2xl font-light mb-1"
            style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
          >
            {site.name}
          </h1>
          <p
            className="text-xs tracking-widest uppercase mb-10"
            style={{ color: "var(--muted)" }}
          >
            {site.role}
          </p>

          <div
            className="flex flex-col gap-5 text-sm leading-relaxed"
            style={{ color: "var(--fg)" }}
          >
            <p>
              Abdulrazak Olaide Malaolu is a multidisciplinary creative director
              whose work spans fashion, styling, art direction, and visual
              storytelling. His creative foundation is rooted in craftsmanship:
              his journey began early through fashion design, embellishment, and
              dressmaking — skills learned from his mother. That early exposure
              to garment construction and detail cultivated a deep appreciation
              for design and shaped his evolving career.
            </p>
            <p>
              In 2023, while studying in Cyprus, he founded{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
                Suavee
              </strong>
              , a contemporary fashion label focused on elevated streetwear and
              minimalist design. Built to merge modern culture with refined
              aesthetics, Suavee became the platform through which he explores
              fashion, storytelling, and creative expression. As Founder and
              Creative Director, he leads the conceptualization and execution of
              collections, brand campaigns, visual identity, and creative
              strategy — ensuring a cohesive narrative across the brand.
            </p>
            <p>
              In 2024 he expanded into styling, deepening his interest in the
              relationship between garments, people, environments, and
              storytelling, and has since overseen the styling and creative
              direction of Suavee's editorials, campaigns, and lookbooks. He
              also leads Suavee's art direction across photography, campaign
              development, concept creation, mood boards, casting, and set
              design — driven by the belief that strong creative work is built
              through consistency, clarity, and intentional storytelling.
            </p>
            <p>
              In October 2025, he joined{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
                Fisco
              </strong>
              , an e-commerce company, where he serves in an Art Direction role
              — broadening his understanding of brand communication, consumer
              engagement, and visual strategy in a fast-paced commercial
              environment.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pull-quote ── */}
      <section
        className="px-8 py-24"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <blockquote
          className="max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <p
            className="text-xl sm:text-2xl font-light leading-snug"
            style={{ color: "var(--fg)" }}
          >
            &ldquo;I believe inspiration exists everywhere — from everyday
            interactions and environments to music, architecture, fashion, and
            human experiences. My process is rooted in observation and
            curiosity, allowing me to discover inspiration in places others may
            overlook, and to translate it into meaningful creative
            outcomes.&rdquo;
          </p>
          <footer
            className="mt-8 text-xs tracking-widest uppercase"
            style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
          >
            — {site.name}
          </footer>
        </blockquote>
      </section>

      {/* ── Contact line ── */}
      <section
        className="px-8 py-12 flex flex-wrap gap-8 border-t"
        style={{ borderColor: "var(--line)" }}
      >
        <a
          href={`mailto:${site.email}`}
          className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
          style={{ color: "var(--muted)" }}
        >
          {site.email}
        </a>
        {suavee && (
          <a
            href={suavee.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
            style={{ color: "var(--muted)" }}
          >
            Suavee Studios ↗
          </a>
        )}
      </section>
    </article>
  );
}
