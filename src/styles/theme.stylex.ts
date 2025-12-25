import * as stylex from "@stylexjs/stylex";

export const colors = stylex.defineVars({
  // Cores principais
  primary: "#D64550",
  secondary: "#FA9500",
  tertiary: "#A7AA29",

  // Sidebar
  sidebarBg: "#211A1E",
  sidebarIcon: "#FDFFFC",

  // Backgrounds
  backgroundLight: "#FDFFFC",
  backgroundDark: "#18181b",

  // Textos
  textMain: "#211A1E",
  textLight: "#FDFFFC",

  // Cards
  cardLight: "#FFFFFF",
  cardDark: "#27272a",
});

// Definindo variáveis de tipografia
export const fonts = stylex.defineVars({
  display: "Montserrat, sans-serif",
  body: "Roboto, sans-serif",
});

// Definindo variáveis de border radius
export const borderRadius = stylex.defineVars({
  default: "1rem",
  soft: "1rem",
});

// Definindo variáveis de sombras
export const shadows = stylex.defineVars({
  soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
  hover: "0 10px 25px rgba(0, 0, 0, 0.1)",
});
