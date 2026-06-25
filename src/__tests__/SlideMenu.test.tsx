import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UIProvider } from "../context/UIContext";
import TopBar from "../components/TopBar";
import SlideMenu from "../components/SlideMenu";

function setup() {
  return render(
    <MemoryRouter>
      <UIProvider>
        <TopBar />
        <SlideMenu />
      </UIProvider>
    </MemoryRouter>,
  );
}

describe("SlideMenu", () => {
  beforeEach(() => sessionStorage.clear());

  it("is hidden on initial render", () => {
    setup();
    // aria-hidden="true" means getByRole needs { hidden: true }
    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog.style.visibility).toBe("hidden");
  });

  it("becomes visible when Menu button is clicked", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog").style.visibility).toBe("visible");
  });

  it("closes on ESC keydown", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("dialog", { hidden: true }).style.visibility).toBe(
      "hidden",
    );
  });

  it("tracks aria-expanded on the menu toggle button", () => {
    setup();
    // Closed: aria-expanded=false
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);

    // Open: find the button by its aria-controls (unique to TopBar's toggle)
    const openToggle = document.querySelector<HTMLElement>(
      '[aria-controls="slide-menu"]',
    );
    expect(openToggle?.getAttribute("aria-expanded")).toBe("true");
  });

  it("renders all nav labels", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav.textContent).toContain("Home");
    expect(nav.textContent).toContain("Work");
    expect(nav.textContent).toContain("Suavee");
    expect(nav.textContent).toContain("About");
  });
});
