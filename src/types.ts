/**
 * Core type definitions for Own-term framework
 */

export interface TermfolioConfig {
    name: string;
    title: string;
    asciiLogo?: string;
    about?: string;
    theme?: string;
    links: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
        email?: string;
        [key: string]: string | undefined;
    };
    projects: Project[];
    skills: Skills;
    resume?: string;
    plugins?: string[];
    customCommands?: Record<string, CommandHandler>;
}

export interface Project {
    name: string;
    desc: string;
    repo?: string;
    url?: string;
    tags?: string[];
    status?: "active" | "archived" | "wip";
}

export interface SkillItem {
  name: string;
  level?: number;  // 0-100
}

export interface Skills {
  languages?: (string | SkillItem)[];
  frameworks?: (string | SkillItem)[];
  tools?: (string | SkillItem)[];
  databases?: (string | SkillItem)[];
  [category: string]: (string | SkillItem)[] | undefined;
}
export type CommandHandler = (args: string[], context: CommandContext) => Promise<void> | void;

export interface CommandContext {
    config: TermfolioConfig;
    render: RenderAPI;
    theme: Theme;
}

export interface RenderAPI {
    box: (content: string, options?: BoxOptions) => void;
    table: (data: Record<string, string>[], headers?: string[]) => void;
    text: (content: string, style?: TextStyle) => void;
    clear: () => void;
    newline: () => void;
    gradient: (text: string, colors?: string[]) => void;
    divider: (char?: string, color?: string) => void;
    header: (text: string, subtitle?: string) => void;
    list: (items: string[], bullet?: string) => void;
    keyValue: (data: Record<string, string>, indent?: number) => void;
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    textAnimated: (content: string, style?: TextStyle) => Promise<void>;
    setTypewriterMode: (enabled: boolean) => void;
}

export interface BoxOptions {
    title?: string;
    padding?: number;
    borderStyle?: "single" | "double" | "round" | "bold";
    borderColor?: string;
}

export interface TextStyle {
    color?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}

export interface Theme {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    text: string;
    dim: string;
}

export interface Plugin {
    name: string;
    version?: string;
    register: (api: PluginAPI) => void;
}

export interface PluginAPI {
    registerCommand: (name: string, description: string, handler: CommandHandler) => void;
    getConfig: () => TermfolioConfig;
    render: RenderAPI;
    theme: Theme;
}

export interface Command {
    name: string;
    description: string;
    aliases?: string[];
    handler: CommandHandler;
}
