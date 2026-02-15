import inquirer from "inquirer";
import chalk from "chalk";
import { TermfolioConfig, CommandContext } from "../types";
import { Router } from "./router";
import { Renderer } from "../render/renderer";
import { getTheme } from "../themes/default";
import { registerCoreCommands } from "../commands";
import { loadPlugins } from "../plugins/loader";
import { showWelcome, runBootSequence } from "./welcome";

export class ShellEngine {
  private router: Router;
  private context: CommandContext;
  private running = false;

  constructor(private config: TermfolioConfig) {
    const theme = getTheme(config.theme);
    const renderer = new Renderer(theme);

    this.context = {
      config,
      render: renderer,
      theme,
    };

    this.context.render.setTypewriterMode(true);
    this.router = new Router(this.context);
  }

  async init(): Promise<void> {
    const coreCommands = registerCoreCommands(this.config, this.context);
    this.router.registerAll(coreCommands);

    if (this.config.customCommands) {
      this.router.registerAll(this.config.customCommands);
    }

    if (this.config.plugins && this.config.plugins.length > 0) {
      await loadPlugins(this.config.plugins, this.context, this.router);
    }
  }

  async start(): Promise<void> {
    this.running = true;

    // Boot sequence → then welcome
    const noAnim = process.argv.includes("--no-animation") || !process.stdout.isTTY;
    if (!noAnim) {
      await runBootSequence(this.context);
    }

    await showWelcome(this.config, this.context);

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
        if (!shouldContinue) this.stop();
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any).isTtyError) {
          this.stop();
        } else {
          console.error("An error occurred:", error);
        }
      }
    }

    this.exit();
  }

  private getPrompt(): string {
    return chalk.hex(this.context.theme.primary).bold("❯ ");
  }

  stop(): void {
    this.running = false;
  }

  private exit(): void {
    this.context.render.newline();
    const g = require("gradient-string");
    console.log(g(this.context.theme.primary, this.context.theme.secondary)("Thanks for visiting! 👋"));
    this.context.render.newline();
    process.exit(0);
  }

  setupSignalHandlers(): void {
    process.on("SIGINT", () => {
      this.context.render.newline();
      this.stop();
    });
    process.on("SIGTERM", () => this.stop());
    process.on("exit", () => {
      process.stdout.write("\x1b[0m");
    });
  }
}