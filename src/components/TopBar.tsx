import { Link } from "react-router-dom";
import { useUI } from "../context/UIContext";
import { site } from "../data/site";
import AudioToggle from "./AudioToggle";

export default function TopBar() {
  const { menuOpen, setMenuOpen, setSearchOpen } = useUI();

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

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

      <div className="flex items-center gap-6">
        <AudioToggle />

        <button
          type="button"
          aria-label="Open search"
          onClick={openSearch}
          className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
          style={{ color: "var(--fg)" }}
        >
          Search
        </button>

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
      </div>
    </header>
  );
}
