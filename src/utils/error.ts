type McpResponseContent = {
  type: "text";
  text: string;
};

type McpResponse = {
  content: McpResponseContent[];
  _meta?: Record<string, unknown>;
  isError?: boolean;
};

export const handleError = (error: unknown): McpResponse => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
  return {
    content: [
      {
        type: "text",
        text: `Error: ${errorMessage}`,
      },
    ],
    isError: true,
  };
};
