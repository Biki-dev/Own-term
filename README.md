# Own-term 🚀

<div align="center">

![Own-term Banner](https://via.placeholder.com/800x200/00D9FF/FFFFFF?text=Own-term)

**Create a beautiful, interactive terminal portfolio — installable via `npx` or `npm i -g`**

[![npm version](https://badge.fury.io/js/own-term.svg)](https://www.npmjs.com/package/own-term)
[![CI](https://github.com/yourusername/own-term/workflows/CI/badge.svg)](https://github.com/yourusername/own-term/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Demo](#demo) • [Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 🎯 What is Own-term?

**Own-term** is a powerful, reusable framework for creating beautiful terminal portfolios.  
Not just a single person's portfolio — it's a complete framework that lets anyone create their own interactive terminal experience.

### Why Own-term?

- 🎨 **Beautiful by default** - Stunning themes, gradients, and ASCII art
- 🔌 **Plugin system** - Extend with custom commands and features
- 🎭 **Multiple themes** - Dark, light, and hacker themes built-in
- ⚡ **Zero config** - Works out of the box, customize when you want
- 📦 **Easy to use** - Run with `npx` or install globally
- 🛠️ **Developer friendly** - TypeScript, well-documented, tested

---

## 📺 Demo

![Demo GIF](https://via.placeholder.com/600x400/1a1a1a/00FF00?text=Demo+Coming+Soon)

Try it now:

```bash
npx own-term
```

---

## ✨ Features

### Core Features (MVP)

- ✅ Interactive shell with commands: `about`, `projects`, `skills`, `contact`, `resume`, `theme`
- ✅ Config file (`termfolio.config.ts`) for easy customization
- ✅ Beautiful ASCII headers and boxed layouts
- ✅ Color themes with gradient support
- ✅ Installable via npm / runnable via npx

### Advanced Features

- 🔌 Plugin system for custom commands
- 🎨 Theme system (colors/fonts/spacing)
- 📊 Component library (Box, Table, Charts)
- 🧪 Full test coverage
- 🚀 CI/CD pipeline
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
  asciiLogo: "YOUR-NAME",
  about: "A brief description about yourself",
  theme: "dark", // dark, light, or hacker
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
      status: "active"
    }
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python"],
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
| `projects` | View projects |
| `skills` | See skills and technologies |
| `contact` | Get contact information |
| `resume` | Open resume (if configured) |
| `theme [name]` | Change theme |
| `clear` | Clear the terminal |
| `help` | Show available commands |
| `exit` | Exit the portfolio |

### Configuration

See [templates/](./templates/) for example configurations:

- [Default](./templates/default/termfolio.config.ts) - Standard professional template
- [Hacker](./templates/hacker/termfolio.config.ts) - Security researcher theme
- [Minimal](./templates/minimal/termfolio.config.ts) - Bare essentials

### Themes

Built-in themes:

- **dark** (default) - Modern dark theme with cyan/purple accents
- **light** - Clean light theme
- **hacker** - Matrix-style green terminal

### Plugin Development

Create custom plugins to extend functionality:

```typescript
import { createPlugin } from "own-term";

export default createPlugin("my-plugin", "1.0.0", (api) => {
  api.registerCommand("custom", "My custom command", async (args) => {
    api.render.header("Custom Command");
    api.render.text("Hello from my plugin!");
  });
});
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
```

### Project Structure

```
own-term/
├── src/
│   ├── cli.ts              # Entry point
│   ├── config.ts           # Config loader
│   ├── types.ts            # TypeScript definitions
│   ├── shell/              # Shell engine & router
│   ├── render/             # Rendering components
│   ├── commands/           # Core commands
│   ├── plugins/            # Plugin system
│   └── themes/             # Theme definitions
├── templates/              # Starter templates
├── tests/                  # Test files
└── bin/                    # Compiled output
```

---

## 🤝 Contributing

We love contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🎨 Create new themes
- 🔌 Build plugins
- ✅ Write tests

---

## 📄 License

MIT © [Biki-dev](https://github.com/Biki-dev)

See [LICENSE](LICENSE) for details.

---

## 🌟 Showcase

Using Own-term for your portfolio? Add it here!

- [Your Portfolio](https://github.com/yourusername/portfolio) - Your Name
---

<div align="center">

**Made with ❤️ by developers, for developers**

[⬆ Back to top](#own-term-)

</div>
