import { describe, it, expect } from "vitest";
import { getTheme, themes } from "../src/themes/default";

describe("Theme System", () => {
    it("should return dark theme by default", () => {
        const theme = getTheme();
        expect(theme).toEqual(themes.dark);
    });

    it("should return correct theme by name", () => {
        const darkTheme = getTheme("dark");
        const lightTheme = getTheme("light");
        const hackerTheme = getTheme("hacker");

        expect(darkTheme).toEqual(themes.dark);
        expect(lightTheme).toEqual(themes.light);
        expect(hackerTheme).toEqual(themes.hacker);
    });

    it("should fallback to dark theme for unknown names", () => {
        const theme = getTheme("unknown");
        expect(theme).toEqual(themes.dark);
    });

    it("should have all required color properties", () => {
        Object.values(themes).forEach((theme) => {
            expect(theme).toHaveProperty("primary");
            expect(theme).toHaveProperty("secondary");
            expect(theme).toHaveProperty("accent");
            expect(theme).toHaveProperty("success");
            expect(theme).toHaveProperty("warning");
            expect(theme).toHaveProperty("error");
            expect(theme).toHaveProperty("text");
            expect(theme).toHaveProperty("dim");
        });
    });
});
