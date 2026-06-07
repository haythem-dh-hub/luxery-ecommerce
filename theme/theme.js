"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#d8a66d",
    },
    secondary: {
      main: "#6c87a8",
    },
    background: {
      default: "#120f0d",
      paper: "rgba(255,255,255,0.06)",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: "var(--font-manrope)",
    h1: {
      fontFamily: "var(--font-space-grotesk)",
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontFamily: "var(--font-space-grotesk)",
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h3: {
      fontFamily: "var(--font-space-grotesk)",
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
  },
});

export default theme;
