import "isomorphic-fetch";

export const createHeaders = (apiKey: string) => ({
  Authorization: apiKey,
  "Content-Type": "application/json",
});

export const createUrl = (spaceId: string, path: string) =>
  `https://mapi.storyblok.com/v1/spaces/${spaceId}${path}`;

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Storyblok API error: ${response.status} ${error}`);
  }
  return response.json();
};
