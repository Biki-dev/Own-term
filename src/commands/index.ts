import chalk from "chalk";
import figlet from "figlet";
import open from "open";
import { CommandHandler, CommandContext, TermfolioConfig } from "../types";
import { Renderer } from "../render/renderer";

/**
 * Register all core commands
 */
export function registerCoreCommands(
    config: TermfolioConfig,
    context: CommandContext
): Record<string, CommandHandler> {
    const commands: Record<string, CommandHandler> = {};

    // Help command
    commands["help"] = async () => {
        context.render.header("Available Commands");

        const commandList = [
            { command: "about", description: "Learn about me" },
            { command: "projects", description: "View my projects" },
            { command: "skills", description: "See my skills" },
            { command: "contact", description: "Get in touch" },
            { command: "resume", description: "View my resume" },
            { command: "theme [name]", description: "Change theme (dark/light/hacker)" },
            { command: "clear", description: "Clear the terminal" },
            { command: "help", description: "Show this help message" },
            { command: "exit", description: "Exit the portfolio" },
        ];

        commandList.forEach(({ command, description }) => {
            const cmd = chalk.hex(context.theme.primary).bold(command.padEnd(20));
            const desc = chalk.hex(context.theme.text)(description);
            console.log(`  ${cmd} ${desc}`);
        });

        context.render.newline();
        context.render.info("Type any command to get started!");
    };

    // About command
    commands["about"] = async () => {
        context.render.header(config.name, config.title);

        if (config.about) {
            context.render.box(config.about, {
                title: "About Me",
                borderColor: context.theme.primary,
            });
        } else {
            context.render.warning("No about information provided in config");
        }

        context.render.newline();
    };

    // Projects command
    commands["projects"] = async () => {
        context.render.header("Projects");

        if (config.projects.length === 0) {
            context.render.warning("No projects found in config");
            return;
        }

        config.projects.forEach((project, index) => {
            const statusEmoji = {
                active: "🟢",
                archived: "⚪",
                wip: "🟡",
            }[project.status || "active"];

            context.render.text(
                `${index + 1}. ${project.name} ${statusEmoji}`,
                { color: context.theme.primary, bold: true }
            );

            context.render.text(`   ${project.desc}`, { color: context.theme.text });

            if (project.repo) {
                context.render.text(`   🔗 ${project.repo}`, { color: context.theme.dim });
            }

            if (project.tags && project.tags.length > 0) {
                const tags = project.tags.map((tag) => chalk.hex(context.theme.accent)(`#${tag}`)).join(" ");
                context.render.text(`   ${tags}`);
            }

            context.render.newline();
        });
    };

    // Skills command
    commands["skills"] = async () => {
        context.render.header("Skills & Technologies");

        const skillCategories = Object.entries(config.skills);

        if (skillCategories.length === 0) {
            context.render.warning("No skills found in config");
            return;
        }

        skillCategories.forEach(([category, items]) => {
            if (items && items.length > 0) {
                const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
                context.render.text(categoryName, { color: context.theme.primary, bold: true });
                context.render.list(items);
                context.render.newline();
            }
        });
    };

    // Contact command
    commands["contact"] = async () => {
        context.render.header("Contact Information");

        const links = config.links;
        const contactData: Record<string, string> = {};

        Object.entries(links).forEach(([key, value]) => {
            if (value) {
                const emoji = {
                    email: "📧",
                    github: "🐙",
                    linkedin: "💼",
                    twitter: "🐦",
                    website: "🌐",
                }[key] || "🔗";

                contactData[`${emoji} ${key.charAt(0).toUpperCase() + key.slice(1)}`] = value;
            }
        });

        if (Object.keys(contactData).length === 0) {
            context.render.warning("No contact information found in config");
            return;
        }

        context.render.box(
            Object.entries(contactData)
                .map(([key, value]) => `${chalk.hex(context.theme.primary).bold(key)}\n${value}`)
                .join("\n\n"),
            { title: "Get in Touch", borderColor: context.theme.accent }
        );

        context.render.newline();
    };

    // Resume command
    commands["resume"] = async () => {
        if (config.resume) {
            context.render.info(`Opening resume: ${config.resume}`);
            try {
                await open(config.resume);
                context.render.success("Resume opened in your browser!");
            } catch (error) {
                context.render.error("Failed to open resume");
            }
        } else {
            context.render.warning("No resume URL provided in config");
        }
    };

    // Clear command
    commands["clear"] = async () => {
        context.render.clear();
        await showWelcome(config, context);
    };

    // Theme command
    commands["theme"] = async (args: string[]) => {
        const themeName = args[0];
        if (!themeName) {
            context.render.info(`Current theme: ${config.theme || "dark"}`);
            context.render.text("Available themes: dark, light, hacker", { color: context.theme.dim });
        } else {
            context.render.info(`Theme switching to '${themeName}' would require restart`);
            context.render.text("Tip: Set theme in your termfolio.config file", { color: context.theme.dim });
        }
    };

    return commands;
}

/**
 * Show welcome screen with ASCII art
 */
export async function showWelcome(config: TermfolioConfig, context: CommandContext): Promise<void> {
    const asciiText = config.asciiLogo || config.name;

    try {
        const ascii = figlet.textSync(asciiText, {
            font: "ANSI Shadow",
            horizontalLayout: "default",
        });

        context.render.gradient(ascii, [context.theme.primary, context.theme.secondary]);
    } catch (error) {
        // Fallback if figlet fails
        context.render.gradient(asciiText, [context.theme.primary, context.theme.secondary]);
    }

    context.render.newline();
    context.render.box(
        `${chalk.hex(context.theme.primary).bold(config.name)}\n${chalk.hex(context.theme.text)(config.title)}`,
        { padding: 1, borderStyle: "round", borderColor: context.theme.accent }
    );

    context.render.newline();
    context.render.text("Type 'help' to see available commands", { color: context.theme.dim });
    context.render.newline();
}
