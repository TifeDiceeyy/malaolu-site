import LazyImage from "../LazyImage";
import type { FeedBlock } from "../../../data/feed";

type Props = Extract<FeedBlock, { type: "images" }>;

export default function ImageBlock({ items, caption, href }: Props) {
  const grid = (
    <div className="flex flex-col gap-1">
      {items.length === 1 ? (
        <LazyImage {...items[0]} />
      ) : (
        <div className="grid grid-cols-2 gap-1">
          {items.map((img, i) => (
            <LazyImage key={i} {...img} />
          ))}
        </div>
      )}
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

  if (!href) return grid;

  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {grid}
    </a>
  );
}
