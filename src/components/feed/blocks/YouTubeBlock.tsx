import { useEffect, useRef, useState } from "react";
import type { FeedBlock } from "../../../data/feed";

type Props = Extract<FeedBlock, { type: "youtube" }>;

export default function YouTubeBlock({ id, loop = false, caption }: Props) {
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

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: loop ? "1" : "0",
    playlist: id,
    controls: "0",
    modestbranding: "1",
    rel: "0",
  });

  return (
    <div className="flex flex-col gap-1">
      <div
        ref={wrapRef}
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: "16/9", background: "var(--line)" }}
      >
        {visible && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={caption ?? `Video ${id}`}
            className="absolute inset-0 w-full h-full border-0"
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
