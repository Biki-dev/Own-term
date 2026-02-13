import { describe, it, expect } from "vitest";
import { loadConfig, getConfigTemplate } from "../src/config";

describe("Config Loader", () => {
    it("should return default config when no config file exists", async () => {
        const config = await loadConfig();

        expect(config).toBeDefined();
        expect(config.name).toBe("Own-term");
        expect(config.title).toBe("Terminal Portfolio Framework");
    });

    it("should validate required fields", async () => {
        const config = await loadConfig();

        expect(config.name).toBeDefined();
        expect(config.links).toBeDefined();
        expect(config.projects).toBeDefined();
        expect(config.skills).toBeDefined();
    });

    it("should generate config template", () => {
        const template = getConfigTemplate();

        expect(template).toContain("export default");
        expect(template).toContain("name:");
        expect(template).toContain("projects:");
    });
});
