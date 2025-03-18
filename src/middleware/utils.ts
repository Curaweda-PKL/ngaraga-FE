// Cache to avoid reading from import.meta.env multiple times.
const envCache: Record<string, string> = {};

// Helper to get an environment variable with a default value.
export const getEnv = (key: string, defaultValue = ""): string => {
  if (key in envCache) {
    return envCache[key];
  }
  // Using import.meta.env from Vite
  const value = import.meta.env[key] ?? defaultValue;
  if (value === defaultValue) {
    // sometimes it's useful to warn if a default value is used
    console.warn(`Environment variable ${key} Using: "${defaultValue}"`);
  }
  envCache[key] = value;
  return value;
};

// Get the server URL from env, defaulting to localhost.
export const SERVER_URL = getEnv("VITE_SERVER_URL", "http://localhost:3000");

// Determine if we're in development mode. i usually use this for image URLs to not use from our servers. but direct Links.
export const IS_DEV = import.meta.env.MODE === "development";
// export const IS_DEV = false; // Force production mode
