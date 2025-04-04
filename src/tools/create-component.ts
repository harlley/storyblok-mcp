import { z } from "zod";
import { createComponent } from "../api/components";
import {
  parseComponentDescription,
  generateComponentName,
  generateSchemaFromDescription,
} from "../utils/component";
import { handleError } from "../utils/error";

export const createComponentSchema = {
  description: z.string().describe("Description of the component you want to create"),
  name: z
    .string()
    .optional()
    .describe("Optional component name. If not provided, will be generated from the description"),
};

type CreateComponentParams = z.infer<z.ZodObject<typeof createComponentSchema>>;

export const createComponentTool = {
  name: "create_component",
  schema: createComponentSchema,
  handler: async (
    params: CreateComponentParams
  ): Promise<{
    content: Array<{
      type: "text";
      text: string;
    }>;
  }> => {
    try {
      const { displayName, schemaDescription } = parseComponentDescription(params.description);
      const componentName = params.name || generateComponentName(displayName, schemaDescription);
      const schema = generateSchemaFromDescription(schemaDescription);

      const result = await createComponent(componentName, schema, {
        display_name: displayName || componentName,
        is_nestable: true,
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `Successfully created component "${componentName}":\n${JSON.stringify(
              result,
              null,
              2
            )}`,
          },
        ],
      };
    } catch (error) {
      return handleError(error);
    }
  },
};
