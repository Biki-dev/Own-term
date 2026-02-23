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
  private lastCommand: string = "";
  private commandCount: number = 0;
  private currentContext: string = "main";

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

        this.commandCount++;
        const shouldContinue = await this.router.execute(command);
        
        // Update context based on command
        if (command.trim()) {
          const cmd = command.trim().split(/\s+/)[0].toLowerCase();
          this.lastCommand = cmd;
          this.currentContext = this.getContextFromCommand(cmd);
        }
        
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

  /**
   * Determine current context based on last command
   */
  private getContextFromCommand(cmd: string): string {
    const contextMap: Record<string, string> = {
      'about': 'about',
      'projects': 'projects',
      'skills': 'skills',
      'contact': 'contact',
      'resume': 'resume',
      'help': 'help',
      'theme': 'theme',
    };
    return contextMap[cmd] || 'main';
  }

  /**
   * Get current time in HH:MM format
   */
  private getTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }

  /**
   * Get a context icon based on current state
   */
  private getContextIcon(): string {
    const theme = this.context.theme;
    const icons: Record<string, string> = {
      'main': chalk.hex(theme.primary)('◆'),
      'about': chalk.hex(theme.accent)('👤'),
      'projects': chalk.hex(theme.success)('📦'),
      'skills': chalk.hex(theme.secondary)('⚡'),
      'contact': chalk.hex(theme.warning)('📧'),
      'resume': chalk.hex(theme.primary)('📄'),
      'help': chalk.hex(theme.dim)('?'),
      'theme': chalk.hex(theme.accent)('🎨'),
    };
    return icons[this.currentContext] || icons['main'];
  }

  /**
   * Generate dynamic, context-aware prompt based on config selection
   */
  private getPrompt(): string {
    const theme = this.context.theme;
    const projectName = this.config.name.toLowerCase().replace(/\s+/g, '-');
    const style = this.config.promptStyle || 'dashboard';
    // Select prompt style based on config
    switch (style) {
      case 'git':
        return this.getGitStylePrompt(projectName);
      case 'time':
        return this.getTimeContextPrompt(projectName);
      case 'dashboard':
        return this.getDevDashboardPrompt(projectName);
      case 'minimal':
        return this.getMinimalPrompt(projectName);
      case 'cyberpunk':
        return this.getCyberpunkPrompt(projectName);
      default:
        return this.getDevDashboardPrompt(projectName);
    }
  }

  /**
   * STYLE 1: Git-style prompt
   */
  private getGitStylePrompt(projectName: string): string {
    const theme = this.context.theme;
    const user = chalk.hex(theme.success).bold('user');
    const host = chalk.hex(theme.primary).bold('termfolio');
    const dir = chalk.hex(theme.accent).bold(`~/${projectName}`);
    const branch = chalk.hex(theme.secondary)(`(${this.currentContext})`);
    const arrow = chalk.hex(theme.primary).bold('❯');
    
    return `${user}@${host} ${dir} ${branch} ${arrow} `;
  }

  /**
   * STYLE 2: Time + Context prompt
   */
  private getTimeContextPrompt(projectName: string): string {
    const theme = this.context.theme;
    const time = chalk.hex(theme.dim)(`[${this.getTime()}]`);
    const icon = this.getContextIcon();
    const project = chalk.hex(theme.primary).bold(projectName);
    const context = chalk.hex(theme.secondary)(this.currentContext);
    const arrow = chalk.hex(theme.accent).bold('▶');
    
    return `${time} ${icon} ${project}:${context} ${arrow} `;
  }

  /**
   * STYLE 3: Full developer dashboard prompt
   */
  private getDevDashboardPrompt(projectName: string): string {
    const theme = this.context.theme;
    
    // Left side: Project + Context
    const project = chalk.hex(theme.primary).bold(`[${projectName}]`);
    const icon = this.getContextIcon();
    const context = chalk.hex(theme.secondary)(this.currentContext);
    
    // Middle: Command counter
    const counter = chalk.hex(theme.dim)(`#${this.commandCount}`);
    
    // Right side: Time
    const time = chalk.hex(theme.accent)(this.getTime());
    
    // Prompt symbol with status
    const symbol = this.lastCommand 
      ? chalk.hex(theme.success)('✓')
      : chalk.hex(theme.primary)('◆');
    const arrow = chalk.hex(theme.primary).bold('❯');
    
    return `${project} ${icon} ${context} ${chalk.hex(theme.dim)('·')} ${counter} ${chalk.hex(theme.dim)('·')} ${time}\n${symbol} ${arrow} `;
  }

  /**
   * STYLE 4: Minimal Zsh-style prompt
   */
  private getMinimalPrompt(projectName: string): string {
    const theme = this.context.theme;
    const icon = this.getContextIcon();
    const dir = chalk.hex(theme.primary)(`~/${projectName}`);
    const arrow = chalk.hex(theme.accent).bold('➜');
    
    return `${icon} ${dir} ${arrow} `;
  }

  /**
   * STYLE 5: Cyberpunk/Matrix style
   */
  private getCyberpunkPrompt(projectName: string): string {
    const theme = this.context.theme;
    
    const glitch = ['█', '▓', '▒', '░'][Math.floor(Math.random() * 4)];
    const prefix = chalk.hex(theme.success)(glitch);
    const user = chalk.hex(theme.primary).bold('root');
    const sep = chalk.hex(theme.dim)('@');
    const host = chalk.hex(theme.accent).bold(projectName);
    const path = chalk.hex(theme.secondary)(`[${this.currentContext}]`);
    const prompt = chalk.hex(theme.success).bold('$');
    
    return `${prefix} ${user}${sep}${host} ${path} ${prompt} `;
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