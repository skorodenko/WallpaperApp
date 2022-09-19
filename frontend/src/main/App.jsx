import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { selectTheme } from "../header/themeSlice"
import WRouter from "./router";

export default function App() {
  const mode = useSelector(selectTheme)
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WRouter />
      </ThemeProvider>
    </React.StrictMode>
  );
}
