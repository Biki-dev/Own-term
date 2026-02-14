import chalk from "chalk";
import boxen from "boxen";
import Table from "cli-table3";
import gradient from "gradient-string";
import { RenderAPI, BoxOptions, TextStyle, Theme } from "../types";
import { typewriter } from "./effects";

export class Renderer implements RenderAPI {
    private typewriterMode: boolean = false;

    constructor(private theme: Theme) { }

    /**
     * Enable or disable typewriter effect globally for animated text
     */
    setTypewriterMode(enabled: boolean): void {
        this.typewriterMode = enabled;
    }

    /**
     * Render content in a box
     */
    box(content: string, options: BoxOptions = {}): void {
        const boxContent = boxen(content, {
            padding: options.padding ?? 1,
            borderStyle: options.borderStyle || "round",
            borderColor: options.borderColor || this.theme.primary,
            title: options.title,
            titleAlignment: "center",
        });
        console.log(boxContent);
    }

    /**
     * Render a table
     */
    table(data: Record<string, string>[], headers?: string[]): void {
        if (data.length === 0) {
            this.text("No data to display", { color: this.theme.dim });
            return;
        }

        const tableHeaders = headers || Object.keys(data[0]);
        const table = new Table({
            head: tableHeaders.map((h) => chalk.hex(this.theme.primary).bold(h)),
            style: {
                head: [],
                border: [this.theme.dim],
            },
        });

        data.forEach((row) => {
            table.push(tableHeaders.map((header) => row[header] || ""));
        });

        console.log(table.toString());
    }

    /**
     * Render styled text
     */
    text(content: string, style: TextStyle = {}): void {
        let output = content;

        if (style.color) {
            output = chalk.hex(style.color)(output);
        }
        if (style.bold) {
            output = chalk.bold(output);
        }
        if (style.italic) {
            output = chalk.italic(output);
        }
        if (style.underline) {
            output = chalk.underline(output);
        }

        console.log(output);
    }

    /**
     * Clear the terminal
     */
    clear(): void {
        console.clear();
    }

    /**
     * Print a newline
     */
    newline(): void {
        console.log();
    }

    /**
     * Render a gradient text
     */
    gradient(text: string, colors: string[] = [this.theme.primary, this.theme.secondary]): void {
        console.log(gradient(...colors)(text));
    }

    /**
     * Render a divider
     */
    divider(char: string = "─", color?: string): void {
        const width = process.stdout.columns || 80;
        const line = char.repeat(width);
        console.log(chalk.hex(color || this.theme.dim)(line));
    }

    /**
     * Render a header with ASCII art
     */
    header(text: string, subtitle?: string): void {
        this.newline();
        this.gradient(text, [this.theme.primary, this.theme.secondary]);
        if (subtitle) {
            this.text(subtitle, { color: this.theme.dim });
        }
        this.divider();
        this.newline();
    }

    /**
     * Render a list
     */
    list(items: string[], bullet: string = "•"): void {
        items.forEach((item) => {
            console.log(`  ${chalk.hex(this.theme.accent)(bullet)} ${item}`);
        });
    }

    /**
     * Render key-value pairs
     */
    keyValue(data: Record<string, string>, indent: number = 0): void {
        const padding = " ".repeat(indent);
        Object.entries(data).forEach(([key, value]) => {
            const keyStr = chalk.hex(this.theme.primary).bold(key);
            const valueStr = chalk.hex(this.theme.text)(value);
            console.log(`${padding}${keyStr}: ${valueStr}`);
        });
    }

    /**
     * Render a success message
     */
    success(message: string): void {
        console.log(chalk.hex(this.theme.success)("✓ " + message));
    }

    /**
     * Render a warning message
     */
    warning(message: string): void {
        console.log(chalk.hex(this.theme.warning)("⚠ " + message));
    }

    /**
     * Render an error message
     */
    error(message: string): void {
        console.log(chalk.hex(this.theme.error)("✗ " + message));
    }

    /**
     * Render an info message
     */
    info(message: string): void {
        console.log(chalk.hex(this.theme.primary)("ℹ " + message));
    }

    /**
     * Render styled text with an optional typewriter effect
     */
    async textAnimated(content: string, style: TextStyle = {}): Promise<void> {
        if (this.typewriterMode) {
            await typewriter(content, {
                color: style.color,
                bold: style.bold,
                newline: true
            });
        } else {
            this.text(content, style);
        }
    }
}
