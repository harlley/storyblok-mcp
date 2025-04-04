import { listComponents } from "../../api/components";

describe("listComponents", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      STORYBLOK_SPACE_ID: "test-space-id",
      STORYBLOK_API_KEY: "test-api-key",
    };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  it("should fetch and return components from Storyblok", async () => {
    const mockComponents = [
      { name: "component1", id: 1 },
      { name: "component2", id: 2 },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ components: mockComponents }),
      text: () => Promise.resolve("mock error text"),
    });

    const result = await listComponents();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://mapi.storyblok.com/v1/spaces/test-space-id/components",
      {
        headers: {
          Authorization: "test-api-key",
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockComponents);
  });

  it("should handle API errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: () => Promise.resolve("Unauthorized"),
    });

    await expect(listComponents()).rejects.toThrow("Storyblok API error: 401 Unauthorized");
  });
});
