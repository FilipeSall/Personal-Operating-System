import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  // Prevent stale artifacts from previous codegen runs.
  clean: true,

  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  exclude: [],

  globalCss: {
    'html, body': {
      fontFamily: 'Manrope, sans-serif',
    },
  },

  theme: {
    extend: {
      breakpoints: {
        bp800: '800px',
        bp1024: '1024px',
        bp1400: '1400px',
        bp1440: '1440px',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        spinnerPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(214, 69, 80, 0.35)' },
          '50%': { boxShadow: '0 0 0 0.35em rgba(214, 69, 80, 0.12)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -6px, 0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(12px, -12px, 0)' },
        },
        rainFall: {
          '0%': { transform: 'translateY(-10%)', opacity: 0 },
          '50%': { opacity: 0.7 },
          '100%': { transform: 'translateY(110%)', opacity: 0 },
        },
        cloudFloat: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(6px)' },
        },
        sunPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.7 },
          '50%': { transform: 'scale(1.08)', opacity: 1 },
        },
      },
      tokens: {
        fonts: {
          bricolage: { value: 'Bricolage Grotesque, sans-serif' },
          manrope: { value: 'Manrope, sans-serif' },
        },
        colors: {
          brand: {
            500: { value: '#D64550' },
            600: { value: '#BF3A44' },
          },
          amber: {
            200: { value: '#FDE68A' },
            400: { value: '#FBBF24' },
            900: { value: '#78350F' },
            950: { value: '#451A03' },
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
          blue: {
            300: { value: '#93C5FD' },
            400: { value: '#60A5FA' },
            500: { value: '#3B82F6' },
            600: { value: '#2563EB' },
          },
          red: {
            400: { value: '#F87171' },
          },
          rose: {
            500: { value: '#F43F5E' },
            600: { value: '#E11D48' },
          },
          orange: {
            300: { value: '#FDB063' },
            400: { value: '#FB923C' },
            500: { value: '#F97316' },
          },
          indigo: {
            400: { value: '#818CF8' },
            500: { value: '#6366F1' },
          },
          purple: {
            500: { value: '#A855F7' },
            600: { value: '#9333EA' },
          },
          teal: {
            300: { value: '#5EEAD4' },
            500: { value: '#14B8A6' },
          },
          cyan: {
            400: { value: '#22D3EE' },
            600: { value: '#0891B2' },
          },
          green: {
            400: { value: '#4ADE80' },
          },
          emerald: {
            500: { value: '#10B981' },
            600: { value: '#059669' },
          },
          pink: {
            400: { value: '#F472B6' },
          },
          gray: {
            400: { value: '#9CA3AF' },
            600: { value: '#4B5563' },
          },
          yellow: {
            500: { value: '#EAB308' },
          },
        },
      },
    },
  },

  outdir: "styled-system",
});
