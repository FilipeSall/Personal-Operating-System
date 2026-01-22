import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,

  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  exclude: [],

  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            500: { value: '#D64550' },
            600: { value: '#BF3A44' },
          },
          surface: {
            950: { value: '#FFFFFF' },
            900: { value: '#F7F7F3' },
            850: { value: '#F1F1EC' },
            800: { value: '#E9E8E2' },
            700: { value: '#DAD9D2' },
          },
          text: {
            primary: { value: '#211A1E' },
            subtle: { value: '#3A2F34' },
            muted: { value: '#5A5257' },
            dim: { value: '#7A7276' },
            faint: { value: '#9B9497' },
            label: { value: '#6D6569' },
          },
          danger: {
            500: { value: '#D64550' },
          },
          success: {
            500: { value: '#A7AA29' },
          },
        },
      },
    },
  },

  outdir: "styled-system",
});
