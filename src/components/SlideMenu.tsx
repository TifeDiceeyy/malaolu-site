import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUI } from "../context/UIContext";
import { site } from "../data/site";
import { SocialIcon } from "./SocialIcon";

const menuLinks = [{ label: "Home", to: "/" }, ...site.nav] as const satisfies {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
}[];

export default function SlideMenu() {
  const { menuOpen, setMenuOpen } = useUI();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const el = menuRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, setMenuOpen]);

  const linkStyle = {
    fontFamily: "var(--font-display)",
    fontStyle: "italic" as const,
    fontWeight: 400,
    fontSize: "clamp(2rem, 8vw, 3.2rem)",
    color: "var(--fg)",
    lineHeight: 1.15,
  };

  return (
    <div
      id="slide-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!menuOpen}
      className={[
        "fixed inset-0 z-50 flex flex-col px-8 py-8",
        "motion-safe:transition-transform motion-safe:duration-300 ease-in-out",
        menuOpen ? "translate-x-0" : "translate-x-full",
      ].join(" ")}
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        visibility: menuOpen ? "visible" : "hidden",
      }}
    >
      {/* Top row: wordmark + close */}
      <div className="flex items-center justify-between shrink-0">
        <span
          className="text-sm tracking-[0.12em] uppercase"
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontStyle: "italic",
            letterSpacing: "0.06em",
            opacity: 0.5,
          }}
        >
          {site.name}
        </span>
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="text-[0.62rem] tracking-[0.25em] uppercase opacity-70 hover:opacity-100 transition-opacity"
          style={{ color: "var(--fg)", fontFamily: "var(--font-ui)" }}
        >
          ✕
        </button>
      </div>

      {/* Centered nav links */}
      <nav
        aria-label="Main navigation"
        className="flex-1 flex flex-col items-center justify-center gap-2"
      >
        {menuLinks.map((item) =>
          "to" in item ? (
            <Link
              key={item.label}
              to={item.to as string}
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-40 transition-opacity duration-200"
              style={linkStyle}
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={(item as { href: string }).href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-40 transition-opacity duration-200"
              style={linkStyle}
            >
              {item.label}
            </a>
          ),
        )}
      </nav>

      {/* Social icons row — centered at bottom */}
      <div className="shrink-0 flex items-center justify-center gap-8 pb-4">
        {site.socials.map((s) =>
          (s.href as string) ? (
            <a
              key={s.label}
              href={s.href}
              target={s.label !== "Gmail" ? "_blank" : undefined}
              rel={s.label !== "Gmail" ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              className="opacity-50 hover:opacity-100 transition-opacity duration-200"
              style={{ color: "var(--fg)" }}
            >
              <SocialIcon label={s.label} size={20} />
            </a>
          ) : (
            <span
              key={s.label}
              aria-label={`${s.label} — coming soon`}
              className="opacity-20 cursor-default"
              style={{ color: "var(--fg)" }}
            >
              <SocialIcon label={s.label} size={20} />
            </span>
          ),
        )}
      </div>
    </div>
  );
}
