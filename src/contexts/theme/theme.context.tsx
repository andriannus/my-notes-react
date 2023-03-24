import PropTypes from "prop-types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { MYN_THEME } from "@/constants";
import { useLocalStorage } from "@/hooks";

import { ThemeContextProps } from "./theme.model";

const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  theme: "",
  toggleMode: () => null,
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const ls = useLocalStorage();

  const [theme, setTheme] = useState(ls.get<string>(MYN_THEME) || "");

  const isDarkMode = useMemo(() => {
    return theme === "dark";
  }, [theme]);

  useEffect(() => {
    if (!theme) {
      const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(darkTheme.matches ? "dark" : "light");
    } else {
      const root = window.document.documentElement;
      root.classList.remove(isDarkMode ? "light" : "dark");
      root.classList.add(theme);

      ls.set(MYN_THEME, theme);
    }
  }, [theme, window]);

  function toggleMode(): void {
    setTheme(isDarkMode ? "light" : "dark");
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export const useTheme = () => useContext(ThemeContext);
