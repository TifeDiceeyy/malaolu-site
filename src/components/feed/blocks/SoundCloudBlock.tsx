import { useEffect, useRef, useState } from "react";
import type { FeedBlock } from "../../../data/feed";

type Props = Extract<FeedBlock, { type: "soundcloud" }>;

export default function SoundCloudBlock({ trackUrl, caption }: Props) {
  const [visible, setVisible] = useState(false);
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

  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    trackUrl
  )}&color=%230a0a0a&auto_play=false&visual=true`;

  return (
    <div className="flex flex-col gap-1">
      <div ref={wrapRef} style={{ minHeight: visible ? undefined : 300 }}>
        {visible && (
          <iframe
            src={src}
            height={300}
            allow="autoplay"
            title={caption ?? "SoundCloud track"}
            className="w-full border-0"
          />
        )}
      </div>
      {caption && (
        <p
          className="text-xs py-2 tracking-wide"
          style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
