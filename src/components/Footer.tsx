import { site } from "../data/site";

type ExternalNavItem = Extract<(typeof site.nav)[number], { href: string }>;

const suavee = site.nav.find(
  (item): item is ExternalNavItem => item.label === "Suavee"
);

export default function Footer() {
  return (
    <footer
      className="w-full px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t"
      style={{
        borderColor: "var(--line)",
        fontFamily: "var(--font-ui)",
      }}
    >
      <p
        className="text-xs tracking-wide"
        style={{ color: "var(--muted)" }}
      >
        {site.copyright}
      </p>

      <p className="flex gap-5 text-xs tracking-wide">
        <a
          href={`mailto:${site.email}`}
          className="hover:opacity-80 transition-opacity"
          style={{ color: "var(--muted)" }}
        >
          {site.email}
        </a>
        {suavee && (
          <a
            href={suavee.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "var(--muted)" }}
          >
            Suavee Studios
          </a>
        )}
      </p>
    </footer>
  );
}
