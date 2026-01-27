import * as stylex from "@stylexjs/stylex";
import { colors } from "../../styles/theme.stylex";

export const styles = stylex.create({
  sidebar: {
    width: "5rem",
    backgroundColor: colors.sidebarBg,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    zIndex: 20,
    flexShrink: 0,
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    "@media (min-width: 1024px)": {
      width: "6rem",
    },
  },

  logo: {
    marginBottom: "2.5rem",
    padding: "0.5rem",
  },

  logoInner: {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "0.75rem",
    backgroundImage: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.sidebarIcon,
    fontWeight: "bold",
    fontSize: "1.5rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },

  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    width: "100%",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },

  navLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: "1",
    color: "#9CA3AF",
    borderRadius: "1rem",
    transition: "all 0.3s",
    cursor: "pointer",
    position: "relative",
    textDecoration: "none",
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: "transparent",
    fontSize: "1.5rem",
    ":hover": {
      color: colors.sidebarIcon,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transform: "scale(1.05)",
    },
  },

  navLinkActive: {
    backgroundColor: colors.primary,
    color: colors.sidebarIcon,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    ":hover": {
      backgroundColor: colors.primary,
      transform: "scale(1.05)",
    },
  },

  tooltip: {
    position: "absolute",
    left: "3.5rem",
    backgroundColor: "#1f2937",
    color: "white",
    fontSize: "0.75rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    borderRadius: "0.25rem",
    opacity: 0,
    transition: "opacity 0.3s",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    zIndex: 50,
  },

  navLinkWithTooltip: {
    ":hover > span": {
      opacity: 1,
    },
  },

  icon: {
    fontSize: "1.5rem",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    width: "100%",
    marginTop: "auto",
  },

  logoutButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: "1",
    color: "#9CA3AF",
    borderRadius: "1rem",
    transition: "all 0.3s",
    cursor: "pointer",
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: "transparent",
    fontSize: "1.5rem",
    ":hover": {
      color: "#ef4444",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
});
