import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About from "../pages/About";

function setup() {
  return render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
}

describe("About page", () => {
  it("renders the site name as a heading", () => {
    setup();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "Malaolu Abdulrazak",
    );
  });

  it("renders the role subtitle", () => {
    setup();
    expect(
      screen.getByText(/Creative Director • Art Director • Stylist/i),
    ).toBeTruthy();
  });

  it("renders the first bio paragraph", () => {
    setup();
    expect(
      screen.getByText(/multidisciplinary creative director/i),
    ).toBeTruthy();
  });

  it("renders the pull-quote text", () => {
    setup();
    expect(screen.getByText(/inspiration exists everywhere/i)).toBeTruthy();
  });

  it("renders the contact email link", () => {
    setup();
    const emailLink = screen.getByRole("link", {
      name: /olaideabdulrazak5@gmail\.com/i,
    });
    expect(emailLink.getAttribute("href")).toBe(
      "mailto:olaideabdulrazak5@gmail.com",
    );
  });
});
