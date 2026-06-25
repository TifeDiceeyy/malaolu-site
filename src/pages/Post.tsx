import { useParams, Link } from "react-router-dom";
import { feed, type FeedBlock } from "../data/feed";
import ImageBlock from "../components/feed/blocks/ImageBlock";
import YouTubeBlock from "../components/feed/blocks/YouTubeBlock";
import SpotifyBlock from "../components/feed/blocks/SpotifyBlock";
import SoundCloudBlock from "../components/feed/blocks/SoundCloudBlock";

type SluggedBlock = Extract<
  FeedBlock,
  { type: "images" | "youtube" | "spotify" | "soundcloud" }
>;

function assertNever(x: never): never {
  throw new Error(`Unhandled block type: ${JSON.stringify(x)}`);
}

function renderDetail(block: SluggedBlock) {
  switch (block.type) {
    case "images":
      return <ImageBlock {...block} />;
    case "youtube":
      return <YouTubeBlock {...block} />;
    case "spotify":
      return <SpotifyBlock {...block} />;
    case "soundcloud":
      return <SoundCloudBlock {...block} />;
    default:
      return assertNever(block);
  }
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();

  const block = slug
    ? (feed.find(
        (b): b is SluggedBlock => b.type !== "quote" && b.slug === slug,
      ) ?? null)
    : null;

  if (!block) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-8"
        style={{ fontFamily: "var(--font-ui)" }}
      >
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--muted)" }}
        >
          Work not found
        </p>
        <Link
          to="/"
          className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
          style={{ color: "var(--fg)" }}
        >
          ← Home
        </Link>
      </div>
    );
  }

  return (
    <article
      className="w-full mx-auto px-6 pb-24"
      style={{ maxWidth: "var(--maxw)" }}
    >
      <div className="py-8">
        <Link
          to="/"
          className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
          style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
        >
          ← Back
        </Link>
      </div>

      <div className="w-full">{renderDetail(block)}</div>

      {block.caption && (
        <p
          className="mt-6 text-sm"
          style={{ color: "var(--muted)", fontFamily: "var(--font-ui)" }}
        >
          {block.caption}
        </p>
      )}
    </article>
  );
}
