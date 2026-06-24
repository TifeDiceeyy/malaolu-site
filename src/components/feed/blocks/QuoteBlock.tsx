import type { FeedBlock } from "../../../data/feed";

type Props = Extract<FeedBlock, { type: "quote" }>;

export default function QuoteBlock({ text }: Props) {
  return (
    <blockquote
      className="py-10 px-4"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <p
        className="text-2xl font-light leading-snug"
        style={{ color: "var(--fg)" }}
      >
        &ldquo;{text}&rdquo;
      </p>
    </blockquote>
  );
}
