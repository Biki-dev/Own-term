# Own-term Project Documentation

## 📁 Project Structure

```
Own-term/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # CI pipeline
│   │   └── publish.yml               # NPM publish workflow
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── src/
│   ├── cli.ts                        # Main entry point
│   ├── config.ts                     # Configuration loader
│   ├── types.ts                      # TypeScript type definitions
│   ├── commands/
│   │   └── index.ts                  # Core command implementations
│   ├── plugins/
│   │   ├── loader.ts                 # Plugin loading system
│   │   └── plugin_api.ts             # Plugin API exports
│   ├── render/
│   │   ├── renderer.ts               # Rendering engine
│   │   └── effects.ts                # Typewriter effects
│   ├── shell/
│   │   ├── engine.ts                 # Interactive shell engine (5 prompt styles)
│   │   ├── router.ts                 # Command router
│   │   └── welcome.ts                # Welcome screen with gradient logo
│   └── themes/
│       └── default.ts                # 6 theme definitions
├── templates/
│   ├── default/
│   │   └── termfolio.config.ts       # Default template
│   ├── hacker/
│   │   └── termfolio.config.ts       # Hacker theme template
│   └── minimal/
│       └── termfolio.config.ts       # Minimal template
├── tests/
│   ├── config.test.ts                # Config tests
│   ├── router.test.ts                # Router tests
│   └── themes.test.ts                # Theme tests
├── bin/                              # Compiled output (generated)
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── .gitignore
├── .eslintrc.json
├── .prettierrc.json
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── DOCS.md
```

---

## 🚀 Quick Start Guide

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Testing the CLI

```bash
# Run the built CLI
node bin/cli.js

# Or use npm dev script
npm run dev

# Run with custom config
node bin/cli.js --config=./my-config.ts
```

### Available Commands in the Portfolio

Once running, try these commands:

- `help` - Show all available commands with descriptions
- `about` - Display about information with bio and stats
- `projects` - Interactive project picker with details
- `skills` - Show skills with progress bars or pills
- `contact` - Display contact information in a card
- `resume` - Open resume URL (if configured)
- `theme [name]` - Change theme or view theme gallery
- `clear` - Clear terminal and show welcome screen again
- `open [service]` - Quick open links (e.g., `open github`, `open email`)
- `exit` / `quit` / `q` - Exit the portfolio

---

## 🎨 Customization

### Creating Your Own Portfolio

1. Create a `termfolio.config.ts` file in your project:

```typescript
export default {
  name: "Your Name",
  title: "Your Title",
  about: "Your bio and what you do...",
  theme: "dark", // dark, light, hacker, neo, dracula, nordic
  promptStyle: "dashboard", // git, time, dashboard, minimal, cyberpunk
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
      url: "https://project-demo.com", // optional live demo
      tags: ["tag1", "tag2"],
      status: "active" // active, wip, or archived
    }
  ],
  skills: {
    // With progress bars (0-100 level)
    languages: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 }
    ],
    // Or simple strings (displayed as pills)
    frameworks: ["React", "Node.js", "Express"],
    tools: ["Git", "Docker", "VS Code"],
    databases: ["PostgreSQL", "MongoDB"]
  },
  resume: "https://yourwebsite.com/resume.pdf"
};
```

2. Run with your config:

```bash
npx own-term --config=./termfolio.config.ts
```

---

## 🎨 Themes

Own-term includes **6 built-in themes**:

### Available Themes

| Theme | Description | Colors |
|-------|-------------|---------|
| **dark** (default) | Modern dark theme | Cyan & purple on black |
| **light** | Clean light theme | Blue & purple on white |
| **hacker** | Matrix-style | Green on black |
| **neo** | Neon cyberpunk | Pink & cyan |
| **dracula** | Classic Dracula | Pink, purple, orange |
| **nordic** | Muted Nordic | Blue-gray tones |

### Using Themes

**In config file:**
```typescript
export default {
  theme: "dracula",
  // ... rest of config
};
```

**Interactively:**
```bash
# View theme gallery
theme

# Switch to a theme
theme neo
```

### Creating Custom Themes

Edit `src/themes/default.ts` to add new themes:

```typescript
export const myTheme: Theme = {
  primary: "#FF6B6B",      // Main color
  secondary: "#4ECDC4",    // Secondary color
  accent: "#FFE66D",       // Accent highlights
  success: "#95E1D3",      // Success messages
  warning: "#F38181",      // Warning messages
  error: "#AA4465",        // Error messages
  text: "#FFFFFF",         // Main text
  dim: "#888888",          // Dimmed text
};

// Register theme
export const themes: Record<string, Theme> = {
  // ... existing themes
  mytheme: myTheme,
};
```

---

## 💻 Prompt Styles

Own-term offers **5 dynamic prompt styles** that are **context-aware**:

### 1. Git-style (`git`)
```
user@termfolio ~/own-term (projects) ❯
```
- Similar to bash/zsh git prompts
- Shows user, host, directory, and context
- Clean and familiar

### 2. Time-based (`time`)
```
[14:23] 📦 own-term:projects ▶
```
- Live time display
- Context-aware icons (📧 contact, 📦 projects, ⚡ skills, etc.)
- Compact and informative

### 3. Dashboard (`dashboard`) - Default
```
[own-term] 📦 projects · #5 · 14:23
✓ ❯
```
- Two-line prompt
- Project name, icon, context, command counter, time
- Success indicator (✓) after commands

### 4. Minimal (`minimal`)
```
◆ ~/own-term ➜
```
- Zsh-style minimalism
- Context icon and directory
- Clean and fast

### 5. Cyberpunk (`cyberpunk`)
```
█ root@own-term [projects] $
```
- Hacker/Matrix aesthetic
- Random glitch characters
- Bold and stylish

### Configuring Prompts

```typescript
export default {
  promptStyle: "time", // Choose your style
  // ... rest of config
};
```

**Prompts are context-aware!** Icons change based on current command:
- `about` → 👤
- `projects` → 📦
- `skills` → ⚡
- `contact` → 📧
- `resume` → 📄
- `help` → ?
- `theme` → 🎨

---

## 🔌 Plugin Development

### Creating a Plugin

```typescript
import { createPlugin } from "own-term";

export default createPlugin("my-plugin", "1.0.0", (api) => {
  // Register custom command
  api.registerCommand(
    "custom",
    "My custom command description",
    async (args) => {
      // Render header
      api.render.header("Custom Command");
      
      // Access config
      const config = api.getConfig();
      api.render.info(`Hello, ${config.name}!`);
      
      // Use theme colors
      api.render.success("Command executed successfully!");
      
      // Handle arguments
      if (args.length > 0) {
        api.render.text(`Args: ${args.join(", ")}`);
      }
    }
  );
});
```

### Plugin API Reference

```typescript
interface PluginAPI {
  // Register a new command
  registerCommand(
    name: string,
    description: string,
    handler: CommandHandler
  ): void;
  
  // Get user config
  getConfig(): TermfolioConfig;
  
  // Rendering utilities
  render: {
    header(text: string): void;
    text(content: string, style?: TextStyle): void;
    success(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    info(message: string): void;
    box(content: string, options?: BoxOptions): void;
    table(data: Record<string, string>[]): void;
    newline(): void;
    divider(): void;
    // ... more render methods
  };
  
  // Current theme colors
  theme: Theme;
}
```

### Using Plugins

Add plugins to your config:

```typescript
export default {
  // ... other config
  plugins: [
    "@username/my-plugin-package",
    "./local-plugin.js"
  ]
};
```

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

```typescript
import { describe, it, expect } from "vitest";

describe("Feature", () => {
  it("should work correctly", () => {
    // Arrange
    const input = "test";
    
    // Act
    const result = doSomething(input);
    
    // Assert
    expect(result).toBe("expected");
  });
});
```

### Test Coverage

Current test coverage:
- Config loader
- Router (command execution)
- Theme system

---

## 📦 Publishing

### Prepare for Publishing

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Build the project: `npm run build`
4. Test locally: `npm link` then `own-term`
5. Verify everything works

### Publish to npm

```bash
# Login to npm
npm login

# Publish package
npm publish --access public
```

### Automated Publishing

The project includes GitHub Actions that automatically:
- Run tests on push/PR
- Publish to npm on GitHub releases

To publish:
1. Create a new release on GitHub
2. Action automatically publishes to npm

---

## 🛠️ Development Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run dev` | Run in development mode with ts-node |
| `npm test` | Run tests with vitest |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## 📊 Architecture Overview

### Core Components

1. **CLI Entry Point** (`cli.ts`)
   - Parses command-line arguments
   - Loads configuration
   - Initializes shell engine

2. **Configuration System** (`config.ts`)
   - Loads `termfolio.config.ts`
   - Validates configuration
   - Provides defaults

3. **Shell Engine** (`shell/engine.ts`)
   - Interactive shell loop
   - 5 prompt styles with context tracking
   - Signal handling
   - Command counter and history

4. **Command Router** (`shell/router.ts`)
   - Routes commands to handlers
   - Supports aliases
   - Error handling

5. **Rendering Engine** (`render/renderer.ts`)
   - Box rendering
   - Table rendering
   - Gradient text
   - Typewriter effects

6. **Plugin System** (`plugins/`)
   - Dynamic plugin loading
   - Plugin API
   - Command registration

7. **Welcome Screen** (`shell/welcome.ts`)
   - Animated logo with gradient
   - Boot sequence
   - User info panel

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clean and rebuild
rm -rf bin/
rm -rf node_modules
npm install
npm run build
```

### Runtime Errors

**Config not loading:**
- Check `termfolio.config.ts` syntax
- Ensure all required fields are present
- Check file location (must be in project root)

**Prompt not changing:**
- Verify `promptStyle` in config
- Check `src/config.ts` includes `promptStyle` in `validateConfig`
- Rebuild: `npm run build`

**Themes not working:**
- Check theme name spelling
- Available themes: dark, light, hacker, neo, dracula, nordic
- Theme changes require restart

### Common Issues

**Terminal compatibility:**
- Some terminals may not support all Unicode characters
- Use `--no-animation` flag to skip animations
- Requires terminal with color support

**Node version:**
- Requires Node.js 18 or higher
- Check version: `node --version`

---

## 📚 Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Chalk Documentation](https://github.com/chalk/chalk)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

---

## 📄 License

MIT © Own-term Contributors

---

**Built for the developer community**