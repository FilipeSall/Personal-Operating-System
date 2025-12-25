import * as stylex from "@stylexjs/stylex";
import { colors, fonts, borderRadius, shadows } from "./theme.stylex";

const styles = stylex.create({
  container: {
    backgroundColor: colors.backgroundLight,
    color: colors.textMain,
    fontFamily: fonts.body,
  },

  containerDark: {
    backgroundColor: colors.backgroundDark,
    color: colors.textLight,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    color: colors.textLight,
    borderRadius: borderRadius.default,
    boxShadow: shadows.soft,
  },

  card: {
    backgroundColor: colors.cardLight,
    borderRadius: borderRadius.default,
    boxShadow: shadows.soft,
  },

  cardDark: {
    backgroundColor: colors.cardDark,
  },
});

export default styles;
