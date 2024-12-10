import tailwindTypography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type {Config} from "tailwindcss";
import {fontFamily} from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-primary": "#FFFFFF",
        "background-secondary": "var(--background-secondary)",
        "call-to-action": "var(--call-to-action)",
      },
      fontFamily: {
        sans: ['"Work Sans"', ...fontFamily.sans], // Keep Work Sans for sans family
        mono: ['"Space Mono"', "monospace"], // Add Space Mono as the mono family
      },
    },
  },
  plugins: [tailwindTypography, daisyui],
} satisfies Config;
