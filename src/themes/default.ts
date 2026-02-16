import { Theme } from "../types";

export const darkTheme: Theme = {
    primary: "#00D9FF",
    secondary: "#BD00FF",
    accent: "#FFD700",
    success: "#00FF88",
    warning: "#FFA500",
    error: "#FF4444",
    text: "#FFFFFF",
    dim: "#888888",
};

export const lightTheme: Theme = {
    primary: "#0066CC",
    secondary: "#9933FF",
    accent: "#FF6600",
    success: "#00AA44",
    warning: "#FF8800",
    error: "#CC0000",
    text: "#000000",
    dim: "#666666",
};

export const hackerTheme: Theme = {
    primary: "#00FF00",
    secondary: "#00AA00",
    accent: "#FFFF00",
    success: "#00FF00",
    warning: "#FFFF00",
    error: "#FF0000",
    text: "#00FF00",
    dim: "#006600",
};
export const neoTheme: Theme = {
  primary: "#FF0080", secondary: "#00FFFF", accent: "#FFFF00",
  success: "#00FF88", warning: "#FFA500", error: "#FF4444",
  text: "#FFFFFF",    dim: "#555577",
};
export const draculaTheme: Theme = {
  primary: "#FF79C6", secondary: "#BD93F9", accent: "#FFB86C",
  success: "#50FA7B", warning: "#F1FA8C", error: "#FF5555",
  text: "#F8F8F2",    dim: "#6272A4",
};
export const nordicTheme: Theme = {
  primary: "#88C0D0", secondary: "#81A1C1", accent: "#EBCB8B",
  success: "#A3BE8C", warning: "#D08770", error: "#BF616A",
  text: "#ECEFF4",    dim: "#4C566A",
};


export const themes: Record<string, Theme> = {
    dark: darkTheme,
    light: lightTheme,
    hacker: hackerTheme,
    neo: neoTheme,
    dracula: draculaTheme,
    nordic: nordicTheme,
};

export function getTheme(name: string = "dark"): Theme {
    return themes[name] || darkTheme;
}
