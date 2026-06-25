import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// RTL auto-cleanup requires afterEach in global scope; with globals:false we register it here
afterEach(cleanup);

// Mock IntersectionObserver — not implemented in jsdom
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock HTMLAudioElement — jsdom has no real audio support
class MockAudio {
  loop = false;
  preload = "";
  play() {
    return Promise.resolve();
  }
  pause() {}
}
Object.defineProperty(globalThis, "Audio", {
  writable: true,
  configurable: true,
  value: MockAudio,
});
