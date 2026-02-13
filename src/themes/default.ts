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

export const themes: Record<string, Theme> = {
    dark: darkTheme,
    light: lightTheme,
    hacker: hackerTheme,
};

export function getTheme(name: string = "dark"): Theme {
    return themes[name] || darkTheme;
}
