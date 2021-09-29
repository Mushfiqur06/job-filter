import React from "react";
import { create } from "jss";
import preset from "jss-preset-default";
import { ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from '@mui/styles';
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../customization";
import Home from "./Home";

const jss = create();
jss.setup(preset());

export default function App() {
  return (
    <React.StrictMode>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </StylesProvider>
    </React.StrictMode>
  );
}
