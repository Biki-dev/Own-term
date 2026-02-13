#!/usr/bin/env node

import { loadConfig } from "./config";
import { ShellEngine } from "./shell/engine";

/**
 * Main CLI entry point
 */
async function main() {
    try {
        // Parse command line arguments
        const args = process.argv.slice(2);
        const configPath = args.find((arg) => arg.startsWith("--config="))?.split("=")[1];

        // Load configuration
        const config = await loadConfig(configPath);

        // Create and initialize shell
        const shell = new ShellEngine(config);
        shell.setupSignalHandlers();

        await shell.init();
        await shell.start();
    } catch (error) {
        console.error("Fatal error:", error);
        process.exit(1);
    }
}

// Run the CLI
main();
