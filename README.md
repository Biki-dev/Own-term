# Own-term 🚀

<div align="center">

![Own-term Banner](https://via.placeholder.com/800x200/00D9FF/FFFFFF?text=Own-term)

**Create a beautiful, interactive terminal portfolio — installable via `npx` or `npm i -g`**

[![npm version](https://badge.fury.io/js/own-term.svg)](https://www.npmjs.com/package/own-term)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🎯 What is Own-term?

**Own-term** is a powerful, reusable framework for creating beautiful terminal portfolios.  
Not just a single person's portfolio — it's a complete framework that lets anyone create their own interactive terminal experience.

### Why Own-term?

- 🎨 **Beautiful by default** - Stunning themes, gradients, and ASCII art
- 🔌 **Plugin system** - Extend with custom commands and features
- 🎭 **Multiple themes** - 6 built-in themes (dark, light, hacker, neo, dracula, nordic)
- 💻 **Dynamic prompts** - 5 configurable prompt styles (git, time, dashboard, minimal, cyberpunk)
- ⚡ **Zero config** - Works out of the box, customize when you want
- 📦 **Easy to use** - Run with `npx` or install globally
- 🛠️ **Developer friendly** - TypeScript, well-documented, tested

---

## ✨ Features

### Core Features

- ✅ Interactive shell with commands: `about`, `projects`, `skills`, `contact`, `resume`, `theme`, `help`
- ✅ Config file (`termfolio.config.ts`) for easy customization
- ✅ Beautiful ASCII logo with Claude-style gradient (orange → pink → purple)
- ✅ 6 color themes with gradient support
- ✅ 5 dynamic prompt styles (git-style, time-based, dashboard, minimal, cyberpunk)
- ✅ Context-aware prompts (changes based on current command)
- ✅ Animated boot sequence and welcome screen
- ✅ Installable via npm / runnable via npx

### Advanced Features

- 🔌 Plugin system for custom commands
- 🎨 Theme system with 6 built-in themes
- 📊 Beautiful rendering components (tables, progress bars, cards)
- 🧪 Full test coverage
- 🚀 CI/CD pipeline with GitHub Actions
- 📚 Comprehensive documentation

---

## 🚀 Quick Start

### Try it instantly

```bash
npx own-term
```

### Install globally

```bash
npm install -g own-term
own-term
```

### Create your own portfolio

1. **Create a config file** (`termfolio.config.ts`):

```typescript
export default {
  name: "Your Name",
  title: "Your Title",
  about: "A brief description about yourself",
  theme: "dark", // dark, light, hacker, neo, dracula, nordic
  promptStyle: "dashboard", // git, time, dashboard, minimal, cyberpunk
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "you@example.com"
  },
  projects: [
    {
      name: "Awesome Project",
      desc: "Description of your project",
      repo: "https://github.com/yourusername/project",
      tags: ["javascript", "react"],
      status: "active" // active, wip, archived
    }
  ],
  skills: {
    languages: [
      { name: "JavaScript", level: 90 }, // with progress bar
      "Python" // or simple string
    ],
    frameworks: ["React", "Node.js"],
    tools: ["Git", "Docker", "VS Code"]
  },
  resume: "https://yourwebsite.com/resume.pdf"
};
```

2. **Run your portfolio**:

```bash
npx own-term --config=./termfolio.config.ts
```

---

## 📖 Documentation

### Available Commands

| Command | Description |
|---------|------------|
| `about` | Learn about the person |
| `projects` | Browse projects (interactive picker) |
| `skills` | See skills with progress bars |
| `contact` | Get contact information |
| `resume` | Open resume (if configured) |
| `theme [name]` | Change theme (or see theme gallery) |
| `clear` | Clear terminal and show welcome screen |
| `help` | Show available commands |
| `exit` | Exit the portfolio |
| `open [service]` | Quick open links (e.g., `open github`) |

### Themes

Built-in themes:

- **dark** (default) - Modern dark theme with cyan/purple accents
- **light** - Clean light theme
- **hacker** - Matrix-style green terminal
- **neo** - Neon pink & cyan
- **dracula** - Classic Dracula palette
- **nordic** - Muted Nordic tones

Change theme in config:
```typescript
theme: "dracula"
```

Or interactively:
```bash
theme dracula
```

### Prompt Styles

Choose from 5 dynamic prompt styles:

1. **git** - Git-style: `user@termfolio ~/project (context) ❯`
2. **time** - Time-based: `[14:23] 📧 project:context ▶`
3. **dashboard** (default) - Full info with time, context, counter
4. **minimal** - Zsh-style: `◆ ~/project ➜`
5. **cyberpunk** - Hacker aesthetic: `█ root@project [context] $`

Configure in `termfolio.config.ts`:
```typescript
promptStyle: "time"
```

Prompts are **context-aware** and change based on your current command!

### Skills Configuration

Two formats supported:

```typescript
skills: {
  // With progress bars (0-100)
  languages: [
    { name: "TypeScript", level: 92 },
    { name: "JavaScript", level: 95 }
  ],
  
  // Simple pills
  tools: ["Git", "Docker", "VS Code"]
}
```

### Example Configurations

See [templates/](./templates/) for complete examples:

- [Default](./templates/default/termfolio.config.ts) - Standard professional template
- [Hacker](./templates/hacker/termfolio.config.ts) - Security researcher theme
- [Minimal](./templates/minimal/termfolio.config.ts) - Bare essentials

---

## 🔌 Plugin Development

Create custom plugins to extend functionality:

```typescript
import { createPlugin } from "own-term";

export default createPlugin("my-plugin", "1.0.0", (api) => {
  api.registerCommand("custom", "My custom command", async (args) => {
    api.render.header("Custom Command");
    api.render.text("Hello from my plugin!");
    
    // Access config
    const config = api.getConfig();
    api.render.info(`User: ${config.name}`);
    
    // Use theme colors
    api.render.success("Command executed!");
  });
});
```

Add plugins to your config:

```typescript
export default {
  // ... other config
  plugins: ["@username/my-plugin-package"]
};
```

---

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Biki-dev/own-term.git
cd own-term

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint

# Format code
npm run format
```

### Project Structure

```
own-term/
├── src/
│   ├── cli.ts              # Entry point
│   ├── config.ts           # Config loader
│   ├── types.ts            # TypeScript definitions
│   ├── shell/
│   │   ├── engine.ts       # Shell engine with 5 prompt styles
│   │   ├── router.ts       # Command router
│   │   └── welcome.ts      # Welcome screen with gradient logo
│   ├── render/
│   │   ├── renderer.ts     # Rendering components
│   │   └── effects.ts      # Typewriter effects
│   ├── commands/
│   │   └── index.ts        # Core commands
│   ├── plugins/
│   │   ├── loader.ts       # Plugin loading system
│   │   └── plugin_api.ts   # Plugin API
│   └── themes/
│       └── default.ts      # 6 theme definitions
├── templates/              # Starter templates
├── tests/                  # Test files
└── bin/                    # Compiled output
```

---

## 🤝 Contributing

We love contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Ways to Contribute

- 🐛 Report bugs via [Issues](https://github.com/Biki-dev/own-term/issues)
- 💡 Suggest features
- 📝 Improve documentation
- 🎨 Create new themes
- 🔌 Build plugins
- ✅ Write tests
- 🌍 Add translations

### Development Workflow

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `npm test`
5. Run linter: `npm run lint`
6. Commit with conventional commits: `feat(prompt): add new style`
7. Push and create a Pull Request

---

## 📄 License

MIT © [Biki-dev](https://github.com/Biki-dev)

See [LICENSE](LICENSE) for details.

---

## 🌟 Showcase

Using Own-term for your portfolio? Add it here!

- Submit a PR to add your portfolio to this list

---

## 🙏 Acknowledgments

- Inspired by terminal-based portfolio projects
- Built with [chalk](https://github.com/chalk/chalk), [inquirer](https://github.com/SBoudrias/Inquirer.js), [boxen](https://github.com/sindresorhus/boxen)
- Logo gradient inspired by [Claude.ai](https://claude.ai)

---

<div align="center">

**Made for developers**

[⬆ Back to top](#own-term-)

</div>