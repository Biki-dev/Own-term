import inquirer from "inquirer";
import chalk from "chalk";
import { TermfolioConfig, CommandContext } from "../types";
import { Router } from "./router";
import { Renderer } from "../render/renderer";
import { getTheme } from "../themes/default";
import { registerCoreCommands, showWelcome } from "../commands";
import { loadPlugins } from "../plugins/loader";

/**
 * Interactive shell engine
 */
export class ShellEngine {
    private router: Router;
    private context: CommandContext;
    private running: boolean = false;

    constructor(private config: TermfolioConfig) {
        const theme = getTheme(config.theme);
        const renderer = new Renderer(theme);

        this.context = {
            config,
            render: renderer,
            theme,
        };

        this.router = new Router(this.context);
    }

    /**
     * Initialize the shell
     */
    async init(): Promise<void> {
        // Register core commands
        const coreCommands = registerCoreCommands(this.config, this.context);
        this.router.registerAll(coreCommands);

        // Register custom commands from config
        if (this.config.customCommands) {
            this.router.registerAll(this.config.customCommands);
        }

        // Load and register plugins
        if (this.config.plugins && this.config.plugins.length > 0) {
            await loadPlugins(this.config.plugins, this.context, this.router);
        }
    }

    /**
     * Start the interactive shell
     */
    async start(): Promise<void> {
        this.running = true;

        // Show welcome screen
        await showWelcome(this.config, this.context);

        // Main input loop
        while (this.running) {
            try {
                const { command } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "command",
                        message: this.getPrompt(),
                        prefix: "",
                    },
                ]);

                const shouldContinue = await this.router.execute(command);
                if (!shouldContinue) {
                    this.stop();
                }
            } catch (error) {
                if ((error as any).isTtyError) {
                    console.error("Prompt couldn't be rendered in the current environment");
                    this.stop();
                } else {
                    console.error("An error occurred:", error);
                }
            }
        }

        this.exit();
    }

    /**
     * Get the command prompt
     */
    private getPrompt(): string {
        const promptSymbol = chalk.hex(this.context.theme.primary)("❯");
        return promptSymbol;
    }

    /**
     * Stop the shell
     */
    stop(): void {
        this.running = false;
    }

    /**
     * Exit the shell with goodbye message
     */
    private exit(): void {
        this.context.render.newline();
        this.context.render.gradient("Thanks for visiting! 👋", [
            this.context.theme.primary,
            this.context.theme.secondary,
        ]);
        this.context.render.newline();
        process.exit(0);
    }

    /**
     * Handle process signals
     */
    setupSignalHandlers(): void {
        process.on("SIGINT", () => {
            this.context.render.newline();
            this.stop();
        });

        process.on("SIGTERM", () => {
            this.stop();
        });

        // Restore terminal on exit
        process.on("exit", () => {
            // Reset terminal state
            process.stdout.write("\x1b[0m"); // Reset colors
        });
    }
}
