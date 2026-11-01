import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

import { getAppTheme, type ThemeMode } from "./index";

interface ThemeModeContextValue {
  mode: ThemeMode;
};

const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: "light",
});

interface Props {
  children: ReactNode;
};

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeProvider = ({ children }: Props) => {
  const prefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)",
  );

  const mode: ThemeMode = prefersDarkMode ? "dark" : "light";

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  const contextValue = useMemo(() => ({ mode }), [mode]);

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;