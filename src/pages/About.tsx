import { site } from "../data/site";

type ExternalNavItem = Extract<(typeof site.nav)[number], { href: string }>;
const suavee = site.nav.find(
  (item): item is ExternalNavItem => item.label === "Suavee",
);

const PORTRAIT = "/assets/malaolu/IMG_3695.jpg";

export default function About() {
  return (
    <article style={{ fontFamily: "var(--font-ui)", color: "#ffffff" }}>
      {/* ── Section 1: Portrait + Bio ──
          Mobile:  dark panel covers full viewport, text centred
          md+:     image shows at its natural aspect ratio (no crop),
                   gradient at bottom, bio text overlaid               */}
      <section
        className="relative"
        style={{
          /* Natural image ratio (3956 × 5120) — no vertical crop on desktop.
             min-height ensures enough space for the dark panel on mobile. */
          aspectRatio: "3956 / 5120",
          minHeight: "100svh",
        }}
      >
        {/* Portrait — always the background */}
        <img
          src={PORTRAIT}
          alt="Abdulrazak Olaide Malaolu"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "60% top" }}
        />

        {/* Gradient — tablet / desktop only */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.5) 45%, transparent 100%)",
          }}
        />

        {/* Bio panel — CSS class switches layout between mobile and md+ */}
        <div className="about-bio-panel">
          <h1
            className="mb-2"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              color: "#ffffff",
            }}
          >
            {site.name}
          </h1>
          <p
            className="text-[0.58rem] tracking-[0.28em] uppercase mb-8"
            style={{ color: "#ffffff" }}
          >
            {site.role}
          </p>

          <div
            className="flex flex-col gap-5 text-sm leading-relaxed"
            style={{ color: "#ffffff" }}
          >
            <p>
              Abdulrazak Olaide Malaolu is a multidisciplinary creative director
              whose work spans fashion, styling, art direction, and visual
              storytelling. With a creative foundation rooted in craftsmanship,
              his journey began at an early age through fashion design,
              embellishment, and dressmaking, skills he learned from his mother.
              This early exposure to garment construction, detail, and artistic
              expression cultivated a deep appreciation for design and laid the
              groundwork for his evolving creative career.
            </p>
            <p>
              In 2023, while studying in Cyprus, Abdulrazak founded{" "}
              <strong style={{ fontWeight: 600 }}>Suavee</strong>, a
              contemporary fashion label focused on elevated streetwear and
              minimalist design. Established with a vision to merge modern
              culture with refined aesthetics, Suavee has become a platform
              through which he explores fashion, storytelling, and creative
              expression. As Founder and Creative Director, he leads the
              conceptualization and execution of collections, brand campaigns,
              visual identity development, and creative strategy, ensuring a
              cohesive narrative across every aspect of the brand.
            </p>
            <p>
              His role extends beyond fashion design. In 2024, Abdulrazak
              expanded his creative practice into styling, developing a stronger
              interest in the relationship between garments, people,
              environments, and storytelling. Since then, he has overseen the
              styling and creative direction of Suavee's editorials, campaigns,
              lookbooks, and visual projects. Through these works, he has
              developed a distinctive approach that combines contemporary
              fashion with thoughtful narratives and strong visual composition.
            </p>
            <p>
              Alongside creative direction and styling, Abdulrazak is
              responsible for the art direction of Suavee, shaping the brand's
              visual language across photography, campaign development, concept
              creation, mood boards, casting, set design, and overall brand
              presentation. His work is driven by the belief that successful
              creative projects are built through consistency, clarity, and
              intentional storytelling.
            </p>
            <p>
              In October 2025, Abdulrazak joined{" "}
              <strong style={{ fontWeight: 600 }}>Fisco</strong>, an e-commerce
              company, where he currently serves in an Art Direction role.
              Working within a commercial and fast-paced environment has
              broadened his understanding of brand communication, consumer
              engagement, and visual strategy. His contributions focus on
              creating impactful visual experiences that strengthen brand
              positioning while maintaining a strong creative standard.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pull-quote ── */}
      <section
        className="px-4 sm:px-12 py-16 md:py-24"
        style={{
          background: "rgba(8,8,8,0.95)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <blockquote
          className="max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <p
            className="font-light leading-snug"
            style={{ fontSize: "clamp(1rem, 4vw, 1.6rem)", color: "#ffffff" }}
          >
            &ldquo;I believe inspiration exists everywhere. From everyday
            interactions and environments to music, architecture, fashion, and
            human experiences, ideas constantly surround us. My process is
            rooted in observation and curiosity, allowing me to discover
            inspiration in places others may overlook. I actively place myself
            in a position to recognize these ideas and translate them into
            meaningful creative outcomes.&rdquo;
          </p>
          <footer
            className="mt-8 text-[0.6rem] tracking-[0.28em] uppercase"
            style={{ color: "#ffffff", fontFamily: "var(--font-ui)" }}
          >
            — {site.name}
          </footer>
        </blockquote>
      </section>

      {/* ── Contact ── */}
      <section
        className="px-4 sm:px-8 py-8 flex flex-wrap gap-6"
        style={{
          background: "rgba(8,8,8,0.95)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <a
          href={`mailto:${site.email}`}
          className="text-[0.6rem] tracking-[0.28em] uppercase hover:opacity-60 transition-opacity"
          style={{ color: "#ffffff" }}
        >
          {site.email}
        </a>
        {suavee && (
          <a
            href={suavee.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6rem] tracking-[0.28em] uppercase hover:opacity-60 transition-opacity"
            style={{ color: "#ffffff" }}
          >
            Suavee Studios ↗
          </a>
        )}
      </section>
    </article>
  );
}
