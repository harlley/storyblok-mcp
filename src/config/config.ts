import { Config } from "../types/types";

export const getConfig = (): Config => {
  const spaceId = process.env["STORYBLOK_SPACE_ID"];
  const apiKey = process.env["STORYBLOK_API_KEY"];

  if (!spaceId || !apiKey) {
    throw new Error(
      "Missing required environment variables: STORYBLOK_SPACE_ID or STORYBLOK_API_KEY"
    );
  }

  return { spaceId, apiKey };
};
