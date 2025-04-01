import { config } from "dotenv";
import { listComponents } from "../../api/components";

config();

describe("Storyblok Integration", () => {
  it("should fetch real components from Storyblok API", async () => {
    try {
      const components = await listComponents();
      expect(Array.isArray(components)).toBe(true);
      if (components.length > 0) {
        expect(components[0]).toHaveProperty("name");
        expect(components[0]).toHaveProperty("id");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  });
});
