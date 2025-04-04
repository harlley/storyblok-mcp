import { listComponents } from "../api/components";
import { handleError } from "../utils/error";

export const listComponentsTool = {
  name: "list_components",
  schema: {},
  handler: async (): Promise<{
    content: Array<{
      type: "text";
      text: string;
    }>;
  }> => {
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
