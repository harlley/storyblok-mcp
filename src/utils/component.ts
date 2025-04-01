import { ComponentSchema, FieldType } from "../types/types";

export const FIELD_TYPES: Record<string, FieldType> = {
  text: "text",
  textarea: "textarea",
  markdown: "markdown",
  number: "number",
  datetime: "datetime",
  boolean: "boolean",
  asset: "asset",
  multilink: "multilink",
  richtext: "richtext",
  bloks: "bloks",
} as const;

export type ParsedDescription = {
  displayName: string | undefined;
  schemaDescription: string;
};

export const parseComponentDescription = (
  description: string
): ParsedDescription => {
  const displayMatch = description.match(/^display:(.+?)(?:\n|$)/);
  const displayName = displayMatch ? displayMatch[1]?.trim() : undefined;

  const schemaMatch = description.match(/schema:([\s\S]+)$/);
  const schemaDescription = schemaMatch
    ? schemaMatch[1]?.trim() ?? description
    : description;

  return { displayName, schemaDescription };
};

export const generateComponentName = (
  displayName: string | undefined,
  description: string
): string => {
  return (displayName || description)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
};

export const generateSchemaFromDescription = (
  description: string
): ComponentSchema => {
  const schema: ComponentSchema = {};
  const fieldPattern = /(\w+)\s*\((\w+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = fieldPattern.exec(description)) !== null) {
    const [_, fieldName, fieldType] = match;
    if (fieldType && fieldName && fieldType in FIELD_TYPES) {
      const type = FIELD_TYPES[fieldType] as FieldType;
      schema[fieldName] = { type };
    }
  }

  if (Object.keys(schema).length === 0) {
    schema["content"] = { type: "text" };
  }

  return schema;
};
