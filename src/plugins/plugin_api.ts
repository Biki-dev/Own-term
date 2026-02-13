import { PluginAPI } from "../types";

/**
 * Example plugin API exports for plugin developers
 */
export { createPlugin } from "./loader";
export type { Plugin, PluginAPI } from "../types";

/**
 * Example plugin template
 */
export const examplePlugin = {
    name: "example-plugin",
    version: "1.0.0",
    register: (api: PluginAPI) => {
        // Register a custom command
        api.registerCommand(
            "example",
            "An example plugin command",
            async (args) => {
                api.render.header("Example Plugin");
                api.render.text("This is an example plugin command!");
                api.render.newline();

                if (args.length > 0) {
                    api.render.info(`You passed: ${args.join(" ")}`);
                }
            }
        );
    },
};
