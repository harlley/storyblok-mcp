import { listComponents } from "../../api/components";
import setupTestEnv from "../setup";

describe("Storyblok Integration", () => {
  beforeAll(() => {
    setupTestEnv();
  });

  it("should fetch real components from Storyblok API", async () => {
    const components = await listComponents();
    expect(Array.isArray(components)).toBe(true);

    if (components.length > 0) {
      expect(components[0]).toHaveProperty("name");
      expect(components[0]).toHaveProperty("id");
    }
  });
});
