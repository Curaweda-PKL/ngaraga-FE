/* eslint-disable import/no-extraneous-dependencies */
import tailwindTypography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-primary': '#2B2B2B',
        'background-secondary': 'var(--background-secondary)',
        'call-to-action': 'var(--call-to-action)',
      },
    },
    fontFamily: {
      sans: ['"Work Sans"', ...fontFamily.sans],
    },
  },
  plugins: [tailwindTypography, daisyui],
} satisfies Config;
