import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WRouter from "./router";


export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function App() {
  const savedMode = localStorage.getItem("mode")
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState(savedMode ? savedMode : (prefersDarkMode ? "dark" : "light"));
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const nmode = prevMode === "light" ? "dark" : "light"
          localStorage.setItem("mode", nmode)
          return nmode
        });
      },
    }),
    []
  );
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
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <WRouter />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.StrictMode>
  );
}
