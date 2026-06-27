import { Link } from "react-router-dom";
import { useUI } from "../context/UIContext";
import { site } from "../data/site";
import { SocialIcon } from "./SocialIcon";

const SOCIAL_LABELS = ["Gmail", "Instagram", "Twitter", "TikTok"] as const;

function NavItem({ item }: { item: (typeof site.nav)[number] }) {
  const cls =
    "nav-animated text-[0.65rem] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-100 opacity-80";
  const style = { color: "var(--fg)", fontFamily: "var(--font-ui)" } as const;

  if ("to" in item) {
    return (
      <Link to={item.to} className={cls} style={style}>
        {item.label}
      </Link>
    );
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      style={style}
    >
      {item.label}
    </a>
  );
}

export default function TopBar() {
  const { menuOpen, setMenuOpen } = useUI();

  const socialNav = site.socials.filter((s) =>
    (SOCIAL_LABELS as readonly string[]).includes(s.label),
  );

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5"
      style={{ fontFamily: "var(--font-ui)" }}
    >
      {/* Wordmark */}
      <Link
        to="/"
        aria-label="Home — Malaolu Abdulrazak"
        className="text-sm tracking-[0.12em] uppercase hover:opacity-70 transition-opacity duration-300 shrink-0"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontStyle: "italic",
          letterSpacing: "0.06em",
        }}
      >
        {site.name}
      </Link>

      {/* Desktop nav */}
      <nav
        className="hidden md:flex items-center gap-7 lg:gap-9"
        aria-label="Main navigation"
      >
        {site.nav.map((item) => (
          <NavItem key={item.label} item={item} />
        ))}

        <span
          aria-hidden="true"
          className="w-px h-3 opacity-20 shrink-0"
          style={{ backgroundColor: "var(--fg)" }}
        />

        {/* Social icons */}
        {socialNav.map((s) =>
          s.href ? (
            <a
              key={s.label}
              href={s.href}
              target={s.label !== "Gmail" ? "_blank" : undefined}
              rel={s.label !== "Gmail" ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 motion-safe:hover:scale-110 motion-safe:transition-transform"
              style={{ color: "var(--fg)" }}
            >
              <SocialIcon label={s.label} size={16} />
            </a>
          ) : (
            <span
              key={s.label}
              aria-label={`${s.label} (coming soon)`}
              className="opacity-25 cursor-default"
              style={{ color: "var(--fg)" }}
            >
              <SocialIcon label={s.label} size={16} />
            </span>
          ),
        )}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-expanded={menuOpen}
        aria-controls="slide-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col justify-center gap-[5px] p-1 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <span
          className="block h-px w-5 origin-center motion-safe:transition-transform motion-safe:duration-300"
          style={{
            backgroundColor: "var(--fg)",
            transform: menuOpen ? "rotate(45deg) translateY(6px)" : undefined,
          }}
        />
        <span
          className="block h-px w-5 motion-safe:transition-opacity motion-safe:duration-300"
          style={{
            backgroundColor: "var(--fg)",
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          className="block h-px w-5 origin-center motion-safe:transition-transform motion-safe:duration-300"
          style={{
            backgroundColor: "var(--fg)",
            transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : undefined,
          }}
        />
      </button>
    </header>
  );
}
