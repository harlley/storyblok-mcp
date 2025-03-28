import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { list_components, create_component, update_component } from '../storyblok';
import * as dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

// Create an MCP server
const server = new McpServer({
  name: "Storyblok MCP",
  version: "1.0.0"
});

// Storyblok components tool
server.tool("list_components",
  {},
  async () => {
    try {
      const components = await list_components();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(components, null, 2)
        }]
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        content: [{
          type: "text",
          text: `Error fetching components: ${errorMessage}`
        }]
      };
    }
  }
);

// Create component tool
server.tool("create_component",
  {
    description: z.string().describe("Description of the component you want to create"),
    name: z.string().optional().describe("Optional component name. If not provided, will be generated from the description")
  },
  async (params) => {
    try {
      // Extract display name if provided in format "display:Name"
      const displayMatch = params.description.match(/^display:(.+?)(?:\n|$)/);
      const displayName = displayMatch ? displayMatch[1].trim() : undefined;

      // Extract schema description (everything after "schema:" if it exists)
      const schemaMatch = params.description.match(/schema:([\s\S]+)$/);
      const schemaDescription = schemaMatch ? schemaMatch[1].trim() : params.description;

      // Generate component name if not provided
      const componentName = params.name || (displayName || schemaDescription)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');

      // Generate schema based on the schema description
      const schema = generateSchemaFromDescription(schemaDescription);

      // Create the component
      const result = await create_component(componentName, schema, {
        display_name: displayName || componentName,
        is_nestable: true
      });

      return {
        content: [{
          type: "text",
          text: `Successfully created component "${componentName}":\n${JSON.stringify(result, null, 2)}`
        }]
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        content: [{
          type: "text",
          text: `Error creating component: ${errorMessage}`
        }]
      };
    }
  }
);

// Update component tool
server.tool("update_component",
  {
    component_id: z.number().describe("ID of the component to update"),
    description: z.string().describe("Description of the changes you want to make to the component"),
    name: z.string().optional().describe("Optional new name for the component")
  },
  async (params) => {
    try {
      // Get current component to verify it exists
      const components = await list_components();
      const component = components.find(c => c.id === params.component_id);
      
      if (!component) {
        throw new Error(`Component with ID ${params.component_id} not found`);
      }

      // Extract display name if provided in format "display:Name"
      const displayMatch = params.description.match(/^display:(.+?)(?:\n|$)/);
      const displayName = displayMatch ? displayMatch[1].trim() : undefined;

      // Extract schema description (everything after "schema:" if it exists)
      const schemaMatch = params.description.match(/schema:([\s\S]+)$/);
      const schemaDescription = schemaMatch ? schemaMatch[1].trim() : params.description;

      // Generate new schema based on the schema description
      const schema = generateSchemaFromDescription(schemaDescription);

      // Update the component with new schema and display name
      const updates = {
        schema,
        ...(params.name && { name: params.name }),
        ...(displayName && { display_name: displayName })
      };

      const result = await update_component(params.component_id, updates);

      return {
        content: [{
          type: "text",
          text: `Successfully updated component:\n${JSON.stringify(result, null, 2)}`
        }]
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        content: [{
          type: "text",
          text: `Error updating component: ${errorMessage}`
        }]
      };
    }
  }
);

function generateSchemaFromDescription(description: string) {
  // Basic field types in Storyblok
  const fieldTypes = {
    text: "text",
    textarea: "textarea",
    markdown: "markdown",
    number: "number",
    datetime: "datetime",
    boolean: "boolean",
    asset: "asset",
    multilink: "multilink",
    richtext: "richtext",
    bloks: "bloks"
  } as const;

  type FieldType = typeof fieldTypes[keyof typeof fieldTypes];
  const schema: Record<string, { type: FieldType }> = {};
  
  // Parse field definitions from description
  const fieldPattern = /(\w+)\s*\((\w+)\)/g;
  let match;
  
  // Extract all fields from the description
  const fields = new Set<string>();
  while ((match = fieldPattern.exec(description)) !== null) {
    const [_, fieldName, fieldType] = match;
    if (fieldType in fieldTypes && fieldName) {
      schema[fieldName] = { type: fieldTypes[fieldType as keyof typeof fieldTypes] };
      fields.add(fieldName);
    }
  }

  // If no fields were detected, add a default text field
  if (Object.keys(schema).length === 0) {
    schema.content = { type: "text" };
  }

  return schema;
}

// Storyblok components resource
server.resource(
  "components",
  new ResourceTemplate("storyblok://components", { list: undefined }),
  async (uri) => {
    try {
      const components = await list_components();
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(components, null, 2)
        }]
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to fetch components: ${errorMessage}`);
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport);