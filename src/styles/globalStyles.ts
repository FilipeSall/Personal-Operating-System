import * as stylex from "@stylexjs/stylex";
import { fonts, colors } from "./theme.stylex";

// Estilos globais base para o aplicativo
export const globalStyles = stylex.create({
  body: {
    fontFamily: fonts.body,
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  heading: {
    fontFamily: fonts.display,
    fontWeight: 600,
  },

  h1: {
    fontFamily: fonts.display,
    fontWeight: 700,
  },

  h2: {
    fontFamily: fonts.display,
    fontWeight: 600,
  },

  h3: {
    fontFamily: fonts.display,
    fontWeight: 600,
  },

  h4: {
    fontFamily: fonts.display,
    fontWeight: 500,
  },

  h5: {
    fontFamily: fonts.display,
    fontWeight: 500,
  },

  h6: {
    fontFamily: fonts.display,
    fontWeight: 500,
  },

  button: {
    fontFamily: fonts.display,
    fontWeight: 500,
  },

  // Reset básico
  "*": {
    boxSizing: "border-box",
  },
});
