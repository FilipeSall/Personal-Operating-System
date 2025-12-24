import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  main: {
    padding: 16,
    display: "grid",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
  },
  message: {
    color: "#4b5563",
  },
});

export default styles;
