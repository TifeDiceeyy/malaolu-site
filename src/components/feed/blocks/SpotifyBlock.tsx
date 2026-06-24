import { useEffect, useRef, useState } from "react";
import type { FeedBlock } from "../../../data/feed";

type Props = Extract<FeedBlock, { type: "spotify" }>;

export default function SpotifyBlock({ playlistId, caption }: Props) {
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

  return (
    <div className="flex flex-col gap-1">
      <div ref={wrapRef} style={{ minHeight: visible ? undefined : 380 }}>
        {visible && (
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            height={380}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={caption ?? `Playlist ${playlistId}`}
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
