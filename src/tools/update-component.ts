import { z } from "zod";
import { listComponents, updateComponent } from "../api/components";
import { parseComponentDescription, generateSchemaFromDescription } from "../utils/component";
import { handleError } from "../utils/error";

export const updateComponentSchema = {
  component_id: z.number().describe("ID of the component to update"),
  description: z.string().describe("Description of the changes you want to make to the component"),
  name: z.string().optional().describe("Optional new name for the component"),
};

type UpdateComponentParams = z.infer<z.ZodObject<typeof updateComponentSchema>>;

export const updateComponentTool = {
  name: "update_component",
  schema: updateComponentSchema,
  handler: async (
    params: UpdateComponentParams
  ): Promise<{
    content: Array<{
      type: "text";
      text: string;
    }>;
  }> => {
    try {
      const components = await listComponents();
      const component = components.find((c) => c.id === params.component_id);

      if (!component) {
        throw new Error(`Component with ID ${params.component_id} not found`);
      }

      const { displayName, schemaDescription } = parseComponentDescription(params.description);
      const schema = generateSchemaFromDescription(schemaDescription);

      const updates = {
        schema,
        ...(params.name && { name: params.name }),
        ...(displayName && { display_name: displayName }),
      };

      const result = await updateComponent(params.component_id, updates);

      return {
        content: [
          {
            type: "text" as const,
            text: `Successfully updated component ${
              params.component_id
            }:\n${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      return handleError(error);
    }
  },
};
