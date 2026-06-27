import { useEffect, useState } from "react";
import { quotes } from "../data/quotes";

const INTERVAL_MS = 8000;

export default function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length);
        setFading(false);
      }, 400);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  if (quotes.length === 0) return null;

  return (
    <blockquote
      className="py-14 max-w-xl"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <p
        aria-live="polite"
        className="text-sm font-light leading-relaxed"
        style={{
          color: "#ffffff",
          fontFamily: "var(--font-ui)",
          fontStyle: "italic",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        &ldquo;{quotes[index]}&rdquo;
      </p>
    </blockquote>
  );
}
