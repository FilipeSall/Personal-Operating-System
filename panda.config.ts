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
            500: { value: '#3B82F6' },
            600: { value: '#2563EB' },
          },
          surface: {
            950: { value: '#16162a' },
            900: { value: '#1a1a2e' },
            850: { value: '#1e1e3f' },
            800: { value: '#252550' },
            700: { value: '#2a2a4e' },
          },
          text: {
            primary: { value: '#ffffff' },
            subtle: { value: '#e0e0e0' },
            muted: { value: '#a0a0a0' },
            dim: { value: '#6b7280' },
            faint: { value: '#4b5563' },
            label: { value: '#9ca3af' },
          },
          danger: {
            500: { value: '#EF4444' },
          },
        },
      },
    },
  },

  outdir: "styled-system",
});
