import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUI } from "../context/UIContext";
import { site } from "../data/site";

export default function SlideMenu() {
  const { menuOpen, setMenuOpen } = useUI();
  const menuRef = useRef<HTMLDivElement>(null);

  // Body scroll lock while open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Focus trap + ESC dismiss
  useEffect(() => {
    if (!menuOpen) return;
    const el = menuRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
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

  return (
    <div
      id="slide-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!menuOpen}
      className={[
        "fixed inset-0 z-50 flex flex-col justify-between px-8 py-10",
        "motion-safe:transition-transform motion-safe:duration-300 ease-in-out",
        menuOpen ? "translate-x-0" : "translate-x-full",
      ].join(" ")}
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        // visibility hidden removes off-screen items from tab order
        visibility: menuOpen ? "visible" : "hidden",
      }}
    >
      {/* Close */}
      <div className="flex justify-end">
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
          style={{ color: "var(--fg)", fontFamily: "var(--font-ui)" }}
        >
          Close
        </button>
      </div>

      {/* Nav */}
      <nav aria-label="Main navigation">
        <ul className="flex flex-col gap-4">
          {site.nav.map((item) =>
            "to" in item ? (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-5xl font-light tracking-tight hover:opacity-50 transition-opacity"
                  style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="text-5xl font-light tracking-tight hover:opacity-50 transition-opacity"
                  style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
                >
                  {item.label}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Socials */}
      <ul className="flex flex-wrap gap-6">
        {site.socials.map((s) =>
          s.href ? (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel={s.label !== "Email" ? "noopener noreferrer" : undefined}
                className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
                style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
              >
                {s.label}
              </a>
            </li>
          ) : (
            <li key={s.label}>
              <span
                className="text-xs tracking-widest uppercase opacity-30 cursor-default"
                style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
              >
                {s.label}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
