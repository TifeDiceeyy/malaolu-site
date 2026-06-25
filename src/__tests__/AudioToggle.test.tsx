import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UIProvider } from "../context/UIContext";
import AudioToggle from "../components/AudioToggle";

function setup() {
  return render(
    <MemoryRouter>
      <UIProvider>
        <AudioToggle />
      </UIProvider>
    </MemoryRouter>,
  );
}

describe("AudioToggle", () => {
  beforeEach(() => sessionStorage.clear());

  it("renders as muted (Sound Off) by default", () => {
    setup();
    expect(screen.getByRole("button").textContent).toBe("Sound Off");
  });

  it("has aria-pressed=false when muted (sound is off, button not pressed)", () => {
    setup();
    expect(screen.getByRole("button").getAttribute("aria-pressed")).toBe(
      "false",
    );
  });

  it("toggles label and aria-pressed on click", () => {
    setup();
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(btn.textContent).toBe("Sound On");
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });

  it("persists muted preference to sessionStorage", () => {
    setup();
    fireEvent.click(screen.getByRole("button")); // unmute
    expect(sessionStorage.getItem("audioMuted")).toBe("false");
    fireEvent.click(screen.getByRole("button")); // re-mute
    expect(sessionStorage.getItem("audioMuted")).toBe("true");
  });
});
