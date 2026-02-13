import { Plugin, PluginAPI, CommandContext } from "../types";
import { Router } from "../shell/router";

/**
 * Load and register plugins
 */
export async function loadPlugins(
    pluginNames: string[],
    context: CommandContext,
    router: Router
): Promise<void> {
    for (const pluginName of pluginNames) {
        try {
            await loadPlugin(pluginName, context, router);
        } catch (error) {
            context.render.warning(`Failed to load plugin '${pluginName}': ${error}`);
        }
    }
}

/**
 * Load a single plugin
 */
async function loadPlugin(
    pluginName: string,
    context: CommandContext,
    router: Router
): Promise<void> {
    try {
        // Try to import the plugin
        const pluginModule = await import(pluginName);
        const plugin: Plugin = pluginModule.default || pluginModule;

        if (!plugin.register || typeof plugin.register !== "function") {
            throw new Error("Plugin must export a 'register' function");
        }

        // Create plugin API
        const api: PluginAPI = {
            registerCommand: (name, description, handler) => {
                router.register(name, description, handler);
            },
            getConfig: () => context.config,
            render: context.render,
            theme: context.theme,
        };

        // Register the plugin
        plugin.register(api);

        context.render.success(`Loaded plugin: ${plugin.name || pluginName}`);
    } catch (error) {
        throw new Error(`Cannot load plugin '${pluginName}': ${error}`);
    }
}

/**
 * Create a plugin helper for easier plugin development
 */
export function createPlugin(
    name: string,
    version: string,
    register: (api: PluginAPI) => void
): Plugin {
    return {
        name,
        version,
        register,
    };
}
