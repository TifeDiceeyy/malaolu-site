import { useEffect, useState } from "react";
import { quotes } from "../data/quotes";

const INTERVAL_MS = 8000;

export default function QuoteRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  if (quotes.length === 0) return null;

  return (
    <blockquote
      className="px-6 py-16 max-w-3xl mx-auto text-center"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <p
        aria-live="polite"
        className="text-lg font-light leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        &ldquo;{quotes[index]}&rdquo;
      </p>
    </blockquote>
  );
}
