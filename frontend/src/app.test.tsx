import { describe, it, expect } from "vitest";
import { App } from "./App";

describe("smoke", () => {
  it("works", () => {
    expect(1 + 1).toBe(2);
  });

  it("App component exists", () => {
    expect(App).toBeDefined();
  });
});