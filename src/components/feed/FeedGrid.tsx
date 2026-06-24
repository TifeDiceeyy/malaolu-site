import { feed, type FeedBlock } from "../../data/feed";
import ImageBlock from "./blocks/ImageBlock";
import YouTubeBlock from "./blocks/YouTubeBlock";
import SpotifyBlock from "./blocks/SpotifyBlock";
import SoundCloudBlock from "./blocks/SoundCloudBlock";
import QuoteBlock from "./blocks/QuoteBlock";

function assertNever(x: never): never {
  throw new Error(`Unhandled feed block: ${JSON.stringify(x)}`);
}

function renderBlock(block: FeedBlock, i: number) {
  switch (block.type) {
    case "images":
      return <ImageBlock key={i} {...block} />;
    case "youtube":
      return <YouTubeBlock key={i} {...block} />;
    case "spotify":
      return <SpotifyBlock key={i} {...block} />;
    case "soundcloud":
      return <SoundCloudBlock key={i} {...block} />;
    case "quote":
      return <QuoteBlock key={i} {...block} />;
    default:
      return assertNever(block);
  }
}

export default function FeedGrid() {
  if (feed.length === 0) {
    return (
      <p
        className="text-center py-32 text-xs tracking-widest uppercase"
        style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
      >
        — Coming soon —
      </p>
    );
  }

  return (
    <div
      className="w-full columns-1 sm:columns-2 lg:columns-3"
      style={{ padding: "0 var(--gap)", columnGap: "var(--gap)" }}
    >
      {feed.map((block, i) => (
        <div
          key={i}
          className="break-inside-avoid"
          style={{ marginBottom: "var(--gap)" }}
        >
          {renderBlock(block, i)}
        </div>
      ))}
    </div>
  );
}
