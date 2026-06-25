import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UIProvider } from "../context/UIContext";
import TopBar from "../components/TopBar";
import SearchOverlay from "../components/SearchOverlay";

function setup() {
  return render(
    <MemoryRouter>
      <UIProvider>
        <TopBar />
        <SearchOverlay />
      </UIProvider>
    </MemoryRouter>,
  );
}

describe("SearchOverlay", () => {
  beforeEach(() => sessionStorage.clear());

  it("is hidden on initial render", () => {
    setup();
    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog.style.visibility).toBe("hidden");
  });

  it("becomes visible when Search button is clicked", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Open search" }));
    expect(screen.getByRole("dialog").style.visibility).toBe("visible");
  });

  it("closes on ESC keydown", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Open search" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("dialog", { hidden: true }).style.visibility).toBe(
      "hidden",
    );
  });

  it("shows helper text when open", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Open search" }));
    expect(screen.getByText(/type to search or esc to close/i)).toBeTruthy();
  });

  it("shows no-results message when query yields nothing", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Open search" }));
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "zzznomatch" } });
    expect(screen.getByText(/no results/i)).toBeTruthy();
  });
});
