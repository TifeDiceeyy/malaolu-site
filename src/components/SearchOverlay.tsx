import { useEffect, useRef, useState } from "react";
import { useUI } from "../context/UIContext";
import { feed, type FeedBlock } from "../data/feed";

function getCaption(block: FeedBlock): string {
  if (block.type === "quote") return block.text;
  return block.caption ?? "";
}

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? feed.filter((b) =>
        getCaption(b).toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  // Focus input on open; clear query on close
  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      // rAF lets the visibility transition fire before focusing
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [searchOpen]);

  // ESC closes
  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, setSearchOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      aria-hidden={!searchOpen}
      className={[
        "fixed inset-0 z-50 flex flex-col px-8 py-10",
        "motion-safe:transition-opacity motion-safe:duration-200",
        searchOpen ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={{
        background: "var(--bg)",
        visibility: searchOpen ? "visible" : "hidden",
      }}
    >
      {/* Close */}
      <div className="flex justify-end">
        <button
          type="button"
          aria-label="Close search"
          onClick={() => setSearchOpen(false)}
          className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
          style={{ color: "var(--fg)", fontFamily: "var(--font-ui)" }}
        >
          Close
        </button>
      </div>

      {/* Input area */}
      <div className="flex-1 flex flex-col justify-center w-full max-w-2xl mx-auto gap-4">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          aria-label="Search works"
          className="w-full bg-transparent border-b text-2xl sm:text-3xl font-light outline-none py-3 placeholder:opacity-20"
          style={{
            borderColor: "var(--line)",
            color: "var(--fg)",
            fontFamily: "var(--font-display)",
            caretColor: "var(--fg)",
          }}
        />
        <p
          className="text-xs tracking-wide"
          style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
        >
          Type to search or ESC to close
        </p>

        {/* Results */}
        {results.length > 0 && (
          <ul className="flex flex-col gap-2 mt-4">
            {results.map((block, i) => (
              <li
                key={i}
                className="text-sm py-2 border-b"
                style={{
                  color: "var(--fg)",
                  borderColor: "var(--line)",
                  fontFamily: "var(--font-ui)",
                }}
              >
                {getCaption(block)}
              </li>
            ))}
          </ul>
        )}

        {query.trim() && results.length === 0 && (
          <p
            className="text-sm mt-4"
            style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
          >
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
