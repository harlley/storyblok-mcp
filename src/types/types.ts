export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "number"
  | "datetime"
  | "boolean"
  | "asset"
  | "multilink"
  | "richtext"
  | "bloks";

export type ComponentField = {
  type: FieldType;
  options?: Record<string, unknown>;
};

export type ComponentSchema = Record<string, ComponentField>;

export type BaseComponentProps = {
  name: string;
  display_name?: string;
  schema: ComponentSchema;
  is_root?: boolean;
  is_nestable?: boolean;
};

export type StoryblokComponent = BaseComponentProps & {
  id: number;
};

export type ComponentOptions = Omit<BaseComponentProps, "name" | "schema">;

export type CreateComponentPayload = {
  component: BaseComponentProps;
};

export type UpdateComponentPayload = {
  component: Partial<BaseComponentProps>;
};

export type Config = {
  spaceId: string;
  apiKey: string;
};
