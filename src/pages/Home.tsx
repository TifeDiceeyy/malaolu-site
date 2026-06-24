import QuoteRotator from "../components/QuoteRotator";
import FeedGrid from "../components/feed/FeedGrid";

export default function Home() {
  return (
    <div
      className="w-full mx-auto pb-16"
      style={{ maxWidth: "var(--maxw)" }}
    >
      <QuoteRotator />
      <FeedGrid />
    </div>
  );
}
