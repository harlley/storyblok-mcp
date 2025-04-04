import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { listComponentsTool, createComponentTool, updateComponentTool } from "./tools";

// Create MCP server
const server = new McpServer({
  name: "Storyblok MCP",
  version: "1.0.0",
});

// Register tools
server.tool(listComponentsTool.name, listComponentsTool.schema, listComponentsTool.handler);

server.tool(createComponentTool.name, createComponentTool.schema, createComponentTool.handler);

server.tool(updateComponentTool.name, updateComponentTool.schema, updateComponentTool.handler);

// Start server
const transport = new StdioServerTransport();
server.connect(transport);
