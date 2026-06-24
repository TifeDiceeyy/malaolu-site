import { type ReactNode } from "react";
import TopBar from "./TopBar";
import SlideMenu from "./SlideMenu";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <TopBar />
      <SlideMenu />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
