import { type ReactNode } from "react";
import TopBar from "./TopBar";
import SlideMenu from "./SlideMenu";
import SearchOverlay from "./SearchOverlay";
import AudioToggle from "./AudioToggle";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "transparent",
        color: "var(--fg)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* ── Fixed video background — plays behind all pages ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/assets/landing.webm" type="video/webm" />
        <source src="/assets/landing.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,10,10,0.38)",
          zIndex: 1,
        }}
      />
      {/* Skip-to-content — surfaces on focus for keyboard / AT users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:uppercase focus:outline-none"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          border: "1px solid var(--line)",
        }}
      >
        Skip to content
      </a>
      <TopBar />
      <SlideMenu />
      <SearchOverlay />
      <AudioToggle />
      <main id="main-content" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
