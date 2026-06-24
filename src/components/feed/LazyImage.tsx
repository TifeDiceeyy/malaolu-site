import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
  w: number;
  h: number;
}

export default function LazyImage({ src, alt, w, h }: Props) {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden w-full"
      style={{ aspectRatio: `${w}/${h}`, background: "var(--line)" }}
    >
      {visible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={[
            "absolute inset-0 w-full h-full object-cover",
            "motion-safe:transition-opacity motion-safe:duration-700",
            loaded ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      )}
    </div>
  );
}
