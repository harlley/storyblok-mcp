import {
  StoryblokComponent,
  ComponentSchema,
  ComponentOptions,
  CreateComponentPayload,
  UpdateComponentPayload,
} from "../types/types";
import { getConfig } from "../config/config";
import { createHeaders, createUrl, handleResponse } from "./client";

export const listComponents = async (): Promise<StoryblokComponent[]> => {
  const { spaceId, apiKey } = getConfig();
  const url = createUrl(spaceId, "/components");
  const headers = createHeaders(apiKey);

  const response = await fetch(url, { headers });
  const data = await handleResponse<{ components: StoryblokComponent[] }>(
    response
  );
  return data.components;
};

export const createComponent = async (
  name: string,
  schema: ComponentSchema,
  options: ComponentOptions = {}
): Promise<StoryblokComponent> => {
  const { spaceId, apiKey } = getConfig();
  const url = createUrl(spaceId, "/components");
  const headers = createHeaders(apiKey);

  const payload: CreateComponentPayload = {
    component: {
      name,
      schema,
      ...options,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return handleResponse<StoryblokComponent>(response);
};

export const updateComponent = async (
  componentId: number,
  updates: Partial<{
    name: string;
    schema: ComponentSchema;
    display_name: string;
    is_root: boolean;
    is_nestable: boolean;
  }>
): Promise<StoryblokComponent> => {
  const { spaceId, apiKey } = getConfig();
  const url = createUrl(spaceId, `/components/${componentId}`);
  const headers = createHeaders(apiKey);

  const payload: UpdateComponentPayload = {
    component: updates,
  };

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
  });

  return handleResponse<StoryblokComponent>(response);
};
