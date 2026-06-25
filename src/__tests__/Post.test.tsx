import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from "../context/UIContext";
import Post from "../pages/Post";

function renderPost(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/work/${slug}`]}>
      <UIProvider>
        <Routes>
          <Route path="/work/:slug" element={<Post />} />
        </Routes>
      </UIProvider>
    </MemoryRouter>,
  );
}

describe("Post page", () => {
  it("shows not-found message for an unknown slug", () => {
    renderPost("unknown-slug");
    expect(screen.getByText(/work not found/i)).toBeTruthy();
  });

  it("renders a home link in the not-found state", () => {
    renderPost("no-match");
    const link = screen.getByRole("link", { name: /home/i });
    expect(link.getAttribute("href")).toBe("/");
  });
});
