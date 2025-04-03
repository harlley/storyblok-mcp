import { config } from "dotenv";
import path from "path";

const setupTestEnv = () => {
  // For integration tests, we want to use the real .env file
  const isIntegrationTest = process.argv.some((arg) =>
    arg.includes("integration")
  );
  const envFile =
    !isIntegrationTest && process.env["NODE_ENV"] === "test"
      ? ".env.test"
      : ".env";

  config({
    path: path.resolve(process.cwd(), envFile),
  });

  // Validate required environment variables
  const requiredEnvVars = ["STORYBLOK_SPACE_ID", "STORYBLOK_API_KEY"];
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}\n` +
        `Please check your ${envFile} file.`
    );
  }
};

export default setupTestEnv;
