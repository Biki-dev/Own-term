import { existsSync } from "fs";
import { resolve, join } from "path";
import { TermfolioConfig } from "./types";

/**
 * Load configuration from user's termfolio.config file
 */
export async function loadConfig(configPath?: string): Promise<TermfolioConfig> {
    const cwd = process.cwd();

    // Try multiple config file locations
    const possiblePaths = [
        configPath,
        join(cwd, "termfolio.config.ts"),
        join(cwd, "termfolio.config.js"),
        join(cwd, "termfolio.config.json"),
        join(cwd, ".termfolio", "config.ts"),
        join(cwd, ".termfolio", "config.js"),
    ].filter(Boolean) as string[];

    for (const path of possiblePaths) {
        if (existsSync(path)) {
            try {
                // Dynamic import for ES modules and TypeScript
                const configModule = await import(resolve(path));
                const config = configModule.default || configModule;
                return validateConfig(config);
            } catch (error) {
                console.error(`Error loading config from ${path}:`, error);
            }
        }
    }

    // Return default config if no config file found
    return getDefaultConfig();
}

/**
 * Validate and normalize configuration
 */
function validateConfig(config: Partial<TermfolioConfig>): TermfolioConfig {
    if (!config.name) {
        throw new Error("Config must include 'name' field");
    }

    return {
        name: config.name,
        title: config.title || "Developer",
        asciiLogo: config.asciiLogo,
        about: config.about,
        theme: config.theme || "dark",
        links: config.links || {},
        projects: config.projects || [],
        skills: config.skills || {},
        resume: config.resume,
        plugins: config.plugins || [],
        customCommands: config.customCommands || {},
    };
}

/**
 * Default configuration for demo purposes
 */
function getDefaultConfig(): TermfolioConfig {
    return {
        name: "Own-term",
        title: "Terminal Portfolio Framework",
        asciiLogo: "OWN-TERM",
        about: "A beautiful, interactive terminal portfolio framework. Create your own with 'npx create-own-term'!",
        theme: "dark",
        links: {
            github: "https://github.com/Biki-dev/own-term",
            email:  "Bikikalitadev@gmail.com",
        },
        projects: [
            {
                name: "Own-term",
                desc: "Reusable terminal portfolio framework",
                repo: "https://github.com/yourusername/own-term",
                tags: ["cli", "node", "typescript"],
                status: "active",
            },
        ],
        skills: {
            languages: ["TypeScript", "JavaScript", "Python"],
            frameworks: ["Node.js", "React"],
            tools: ["Git", "Docker", "VS Code"],
        },
        plugins: [],
    };
}

/**
 * Save configuration to file
 */
export function getConfigTemplate(): string {
    return `export default {
  name: "Your Name",
  title: "Your Title",
  asciiLogo: "YOUR-NAME",
  about: "A brief description about yourself and what you do.",
  theme: "dark", // dark, light, or hacker
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "you@example.com",
    website: "https://yourwebsite.com"
  },
  projects: [
    {
      name: "Project Name",
      desc: "Project description",
      repo: "https://github.com/yourusername/project",
      tags: ["tag1", "tag2"],
      status: "active" // active, archived, or wip
    }
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python"],
    frameworks: ["React", "Node.js", "Express"],
    tools: ["Git", "Docker", "VS Code"],
    databases: ["PostgreSQL", "MongoDB"]
  },
  resume: "https://yourwebsite.com/resume.pdf"
};
`;
}
