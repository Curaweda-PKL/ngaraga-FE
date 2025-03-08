const envCache: Record<string, string> = {};

export const getEnv = (key: string, defaultValue = ""): string => {
  if (key in envCache) {
    return envCache[key];
  }
  const value = import.meta.env[key] ?? defaultValue;
  if (value === defaultValue) {
    console.warn(`Environment variable ${key} is not defined. Using default: "${defaultValue}"`);
  }
  envCache[key] = value;
  return value;
};

export const SERVER_URL = getEnv("VITE_SERVER_URL", "http://localhost:3000");
