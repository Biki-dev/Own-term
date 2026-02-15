import chalk from "chalk";
import { TermfolioConfig, CommandContext } from "../types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function termWidth(): number {
  return process.stdout.columns || 100;
}


const LOGO_RAW = [
  "  ╔══════╦════════════════╗  ",
  "  ║  ░░  ╠══════════════╗ ║  ",
  "  ║  ░░  ╠═════╗  ░░░░  ║ ║  ",
  "  ║  ░░  ║     ║  ░░░░  ║ ║  ",
  "  ║  ░░  ║     ╠══════════╣  ",
  "  ║  ░░  ║     ║  ░░░░  ║ ║  ",
  "  ╚══════╝     ╚══════════╝  ",
];

// Right panel has 19 lines — center logo vertically with equal top/bottom padding
const RIGHT_PANEL_HEIGHT = 19;
const _topPad    = Math.floor((RIGHT_PANEL_HEIGHT - LOGO_RAW.length) / 2);
const _bottomPad = RIGHT_PANEL_HEIGHT - LOGO_RAW.length - _topPad;

const LOGO_LINES = [
  ...Array(_topPad).fill(""),
  ...LOGO_RAW,
  ...Array(_bottomPad).fill(""),
];

// Per-row RGB: cyan #00E5FF → purple #B347FF
const GRADIENT_RGB: [number, number, number][] = [
  [0,   229, 255],
  [30,  196, 255],
  [60,  163, 255],
  [90,  130, 255],
  [120,  97, 255],
  [150,  74, 255],
  [179,  71, 255],
];

function colorLogoLine(line: string, row: number): string {
  const [r, g, b] = GRADIENT_RGB[Math.min(row, GRADIENT_RGB.length - 1)];
  return chalk.rgb(r, g, b)(line);
}

// ─── Time helpers ─────────────────────────────────────────────────────────────

function getTimeString(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
}

function getDateString(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short", year: "numeric", month: "short", day: "numeric",
  });
}

function getVersion(): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require("../../package.json") as { version?: string };
    return pkg.version ?? "1.0.0";
  } catch {
    return "1.0.0";
  }
}

// ─── Right info panel ─────────────────────────────────────────────────────────

function buildRightPanel(
  config: TermfolioConfig,
  theme: { primary: string; secondary: string; accent: string; dim: string },
  panelWidth: number
): string[] {
  const cyan   = (s: string) => chalk.hex(theme.primary)(s);
  const purple = (s: string) => chalk.hex(theme.secondary)(s);
  const gold   = (s: string) => chalk.hex(theme.accent)(s);
  const dim    = (s: string) => chalk.hex(theme.dim)(s);
  const white  = (s: string) => chalk.white(s);
  const bold   = (s: string) => chalk.bold(s);
  const rule   = dim("─".repeat(panelWidth));
  const _      = "";

  return [
    _,
    bold(white(config.name)),
    dim(config.title || "Developer"),
    rule,
    _,
    gold("v") + white(getVersion()) + "   " + dim("·") + "   " + cyan("⏱  ") + white(getTimeString()),
    dim(getDateString()),
    rule,
    _,
    cyan("  Get started"),
    _,
    dim("  › ") + cyan("about      ") + dim("Who I am"),
    dim("  › ") + cyan("projects   ") + dim("What I've built"),
    dim("  › ") + cyan("skills     ") + dim("My tech stack"),
    dim("  › ") + cyan("contact    ") + dim("Reach out"),
    _,
    dim("  type ") + cyan(bold("help")) + dim(" for all commands"),
    _,
    dim("  ") + purple("◆") + dim("  " + (config.theme ?? "dark") + " theme  ·  " + config.projects.length + " projects"),
  ];
}

// ─── Main welcome renderer ────────────────────────────────────────────────────

export async function showWelcome(
  config: TermfolioConfig,
  context: CommandContext
): Promise<void> {
  const theme  = context.theme;
  const total  = Math.min(termWidth(), 110);
  const logoW  = Math.max(...LOGO_LINES.map((l) => l.length));
  const rightW = Math.max(32, total - logoW - 3);

  const rightLines = buildRightPanel(config, theme, rightW);
  const totalRows  = Math.max(LOGO_LINES.length, rightLines.length);
  const sep        = chalk.hex(theme.dim)("│");

  process.stdout.write("\n");

  for (let i = 0; i < totalRows; i++) {
    const rawLogo   = LOGO_LINES[i] ?? "";
    const rightLine = rightLines[i] ?? "";

    const coloredLogo = rawLogo.trim()
      ? colorLogoLine(rawLogo, Math.min(i - _topPad, LOGO_RAW.length - 1))
      : rawLogo;

    const logoPad = " ".repeat(Math.max(0, logoW - rawLogo.length));

    console.log(`${coloredLogo}${logoPad} ${sep} ${rightLine}`);

    // Stagger logo lines
    if (rawLogo.trim()) await sleep(55);
  }

  process.stdout.write("\n");
  console.log(chalk.hex(theme.dim)("─".repeat(total)));
  process.stdout.write("\n");
}

// ─── Boot sequence ────────────────────────────────────────────────────────────

export async function runBootSequence(
  context: CommandContext
): Promise<void> {
  const theme = context.theme;
  const ok    = chalk.hex(theme.success).bold("OK ");
  const sys   = chalk.hex(theme.dim)("SYS");
  const arrow = chalk.hex(theme.primary).bold("▶  ");
  const ts    = () => chalk.hex(theme.dim)(`[${new Date().toISOString()}]`);
  const msg   = (s: string) => chalk.hex("#6a6a9a")(s);

  const lines: Array<[string, string]> = [
    [sys,   "own-term starting..."],
    [ok,    "Configuration loaded"],
    [ok,    "Rendering engine initialized"],
    [ok,    `Theme: ${context.config.theme ?? "dark"}`],
    [ok,    "Plugin system ready"],
    [ok,    "Shell engine started"],
    [arrow, "Launching portfolio..."],
  ];

  for (const [badge, text] of lines) {
    process.stdout.write(`  ${ts()}  ${badge}  ${msg(text)}\n`);
    await sleep(55);
  }

  await sleep(300);
  console.clear();
}