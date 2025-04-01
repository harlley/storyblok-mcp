import { listComponents } from "../api/components";
import { handleError } from "../utils/error";

export const listComponentsTool = {
  name: "list_components",
  schema: {},
  handler: async (_args: Record<string, never>, _extra: unknown) => {
    try {
      const components = await listComponents();
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(components, null, 2),
          },
        ],
      };
    } catch (error) {
      return handleError(error);
    }
  },
};
