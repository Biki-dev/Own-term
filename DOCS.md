# Own-term Project Documentation

## 📁 Project Structure

```
Own-term/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # CI pipeline
│   │   └── publish.yml               # NPM publish workflow
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── src/
│   ├── cli.ts                        # Main entry point
│   ├── config.ts                     # Configuration loader
│   ├── types.ts                      # TypeScript type definitions
│   ├── types/
│   │   └── external.d.ts             # External module declarations
│   ├── commands/
│   │   └── index.ts                  # Core command implementations
│   ├── plugins/
│   │   ├── loader.ts                 # Plugin loading system
│   │   └── plugin_api.ts             # Plugin API exports
│   ├── render/
│   │   └── renderer.ts               # Rendering engine
│   ├── shell/
│   │   ├── engine.ts                 # Interactive shell engine
│   │   └── router.ts                 # Command router
│   └── themes/
│       └── default.ts                # Theme definitions
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
├── SECURITY.md
└── CHANGELOG.md
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
```

### Available Commands in the Portfolio

Once running, try these commands:

- `help` - Show all available commands
- `about` - Display about information
- `projects` - List all projects
- `skills` - Show skills and technologies
- `contact` - Display contact information
- `resume` - Open resume (if configured)
- `theme [name]` - Change theme
- `clear` - Clear the terminal
- `exit` - Exit the portfolio

---

## 🎨 Customization

### Creating Your Own Portfolio

1. Create a `termfolio.config.ts` file in your project:

```typescript
export default {
  name: "Your Name",
  title: "Your Title",
  asciiLogo: "YOUR-NAME",
  about: "Your bio...",
  theme: "dark",
  links: {
    github: "https://github.com/yourusername",
    email: "you@example.com"
  },
  projects: [
    {
      name: "Project Name",
      desc: "Description",
      repo: "https://github.com/...",
      tags: ["tag1", "tag2"],
      status: "active"
    }
  ],
  skills: {
    languages: ["JavaScript", "Python"],
    tools: ["Git", "Docker"]
  }
};
```

2. Run with your config:

```bash
npx own-term --config=./termfolio.config.ts
```

---

## 🎨 Available Themes

- **dark** (default) - Modern dark theme with cyan/purple accents
- **light** - Clean light theme
- **hacker** - Matrix-style green terminal

### Creating Custom Themes

Edit `src/themes/default.ts` to add new themes:

```typescript
export const myTheme: Theme = {
  primary: "#FF6B6B",
  secondary: "#4ECDC4",
  accent: "#FFE66D",
  success: "#95E1D3",
  warning: "#F38181",
  error: "#AA4465",
  text: "#FFFFFF",
  dim: "#888888",
};
```

---

## 🔌 Plugin Development

### Creating a Plugin

```typescript
import { createPlugin } from "own-term";

export default createPlugin("my-plugin", "1.0.0", (api) => {
  api.registerCommand(
    "custom",
    "My custom command",
    async (args) => {
      api.render.header("Custom Command");
      api.render.text("Hello from my plugin!");

      const config = api.getConfig();
      api.render.info(`User: ${config.name}`);
    }
  );
});
```

### Using Plugins

Add plugins to your config:

```typescript
export default {
  // ... other config
  plugins: ["my-plugin-package"]
};
```

---

## 🧪 Testing

### Run Tests

```bash
npm test
npm test -- --coverage
npm test -- --watch
```

### Writing Tests

```typescript
import { describe, it, expect } from "vitest";

describe("Feature", () => {
  it("should work correctly", () => {
    expect(true).toBe(true);
  });
});
```

---

## 📦 Publishing

### Prepare for Publishing

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Build the project: `npm run build`
4. Test locally: `npm link` then `own-term`

### Publish to npm

```bash
npm login
npm publish --access public
```

### Automated Publishing

The project includes a GitHub Action that automatically publishes to npm when you create a release on GitHub.

---

## 🛠️ Development Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode with ts-node
- `npm test` - Run tests with vitest
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

---

## 📊 Architecture Overview

### Core Components

1. **CLI Entry Point** (`cli.ts`)
2. **Configuration System** (`config.ts`)
3. **Shell Engine** (`shell/engine.ts`)
4. **Command Router** (`shell/router.ts`)
5. **Rendering Engine** (`render/renderer.ts`)
6. **Plugin System** (`plugins/`)

---

## 🐛 Troubleshooting

### Build Errors

```bash
rm -rf bin/
rm -rf node_modules && npm install
npm run build
```

### Runtime Errors

- Check your `termfolio.config.ts` syntax
- Ensure all required fields are present
- Verify plugin names are correct
- Check terminal compatibility

---

## 📚 Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

---

## 📄 License

MIT © Own-term Contributors

---

**Built with ❤️ for the developer community**
