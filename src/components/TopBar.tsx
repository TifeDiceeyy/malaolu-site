import { Link } from "react-router-dom";
import { useUI } from "../context/UIContext";
import { site } from "../data/site";

export default function TopBar() {
  const { menuOpen, setMenuOpen } = useUI();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5"
      style={{ fontFamily: "var(--font-ui)" }}
    >
      <Link
        to="/"
        className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
        style={{ color: "var(--fg)" }}
      >
        {site.name}
      </Link>

      <button
        type="button"
        aria-expanded={menuOpen}
        aria-controls="slide-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
        style={{ color: "var(--fg)" }}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
    </header>
  );
}
