import chalk from "chalk";

/**
 * Typewriter effect for single string
 */
export async function typewriter(
    text: string,
    options: {
        speed?: number;       // ms per character, default 18
        color?: string;       // hex color
        bold?: boolean;
        newline?: boolean;    // print newline at end
    } = {}
): Promise<void> {
    const { speed = 18, color, bold = false, newline = true } = options;

    for (const char of text) {
        let output = char;
        if (color) output = chalk.hex(color)(output);
        if (bold) output = chalk.bold(output);
        process.stdout.write(output);
        await sleep(speed);
    }

    if (newline) process.stdout.write("\n");
}

/**
 * Typewriter effect for multiple lines
 */
export async function typewriterLines(
    lines: string[],
    options: { speed?: number; lineDelay?: number; color?: string } = {}
): Promise<void> {
    const { lineDelay = 80 } = options;
    for (const line of lines) {
        await typewriter(line, options);
        await sleep(lineDelay);
    }
}

/**
 * Blinking cursor while "thinking"
 */
export async function thinkingCursor(
    durationMs: number,
    message = "Processing"
): Promise<void> {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    const interval = setInterval(() => {
        process.stdout.write(`\r${chalk.cyan(frames[i % frames.length])} ${message}...`);
        i++;
    }, 80);
    await sleep(durationMs);
    clearInterval(interval);
    process.stdout.write("\r" + " ".repeat(message.length + 10) + "\r");
}

/**
 * Helper to sleep for a given duration
 */
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
