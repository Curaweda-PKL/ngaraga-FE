export const getEnv = (key: string, defaultValue = ""): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`Environment variable ${key} is not defined.`);
    return defaultValue;
  }
  return value;
};

export const SERVER_URL = getEnv("VITE_SERVER_URL", "http://localhost:3000");

