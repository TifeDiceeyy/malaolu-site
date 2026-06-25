import { site } from "../data/site";
import QuoteRotator from "../components/QuoteRotator";
import FeedGrid from "../components/feed/FeedGrid";

export default function Home() {
  return (
    <div className="w-full mx-auto pb-16" style={{ maxWidth: "var(--maxw)" }}>
      <h1 className="sr-only">
        {site.name} — {site.role}
      </h1>
      <QuoteRotator />
      <FeedGrid />
    </div>
  );
}
