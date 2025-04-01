# Storyblok MCP

A Model Context Protocol (MCP) implementation for Storyblok that allows you to manage components through natural language descriptions.

## Features

- Create Storyblok components using natural language descriptions
- Update existing components with new fields and properties
- List all available components
- Smart schema generation from descriptions
- Support for various field types (text, richtext, asset, multilink, etc.)

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd storyblok-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your Storyblok credentials:
- `STORYBLOK_SPACE_ID`: Your Storyblok space ID
- `STORYBLOK_API_KEY`: Your Storyblok API key

## Usage

Start the MCP server:
```bash
npm start
```

### Creating Components

Create components by providing a description with display name and schema:

```
display:Component Name

schema:
field1 (text)
field2 (richtext)
field3 (asset)
field4 (multilink)
```

### Updating Components

Update components by specifying their ID and new properties:

```
display:New Display Name

schema:
newField1 (text)
newField2 (richtext)
```

### Supported Field Types

- text: Simple text field
- textarea: Multi-line text field
- richtext: Rich text editor
- markdown: Markdown editor
- number: Numeric input
- datetime: Date and time picker
- boolean: True/false toggle
- asset: File/image selector
- multilink: Link selector
- bloks: Nested components

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

Run tests:
```bash
npm test
```

## Cursor MCP Setup

To use this MCP in Cursor, you need to configure it in your Cursor MCP settings:

```json
{
  "mcpServers": {
    "Storyblok MCP": {
      "command": "npx",
      "args": [
        "tsx",
        "/path/to/your/storyblok-mcp/src/main.ts"
      ],
      "env": {
        "STORYBLOK_SPACE_ID": "your_space_id",
        "STORYBLOK_API_KEY": "your_api_key"
      }
    }
  }
}
```

Replace:
- `/path/to/your/storyblok-mcp` with the actual path where you cloned this repository
- `your_space_id` with your Storyblok space ID
- `your_api_key` with your Storyblok API key

After saving the configuration, restart Cursor for the changes to take effect. You can then use natural language commands to manage your Storyblok components directly from Cursor. 
