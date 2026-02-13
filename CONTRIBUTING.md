# Contributing to Own-term

First off, thank you for considering contributing to Own-term! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

---

## Code of Conduct

This project and everyone participating in it is governed by our  
[Code of Conduct](CODE_OF_CONDUCT.md).  
By participating, you are expected to uphold this code.

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Environment details** (OS, Node version, etc.)
- **Screenshots** if applicable

### Suggesting Features

Feature suggestions are welcome! Please:

- **Use a clear title**
- **Provide a detailed description**
- **Explain the use case**
- **Consider implementation complexity**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Add tests if applicable
4. Ensure tests pass (`npm test`)
5. Ensure linting passes (`npm run lint`)
6. Update documentation if needed
7. Submit the pull request

---

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/own-term.git
cd own-term

# Add upstream remote
git remote add upstream https://github.com/Biki-dev/own-term.git

# Install dependencies
npm install

# Create a branch
git checkout -b feature/my-feature

# Run in development mode
npm run dev
```

---

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

### Building

```bash
# Build the project
npm run build

# The compiled output will be in bin/
```

---

## Pull Request Process

1. **Update documentation** – Update `README.md` if you change functionality  
2. **Add tests** – Ensure new features have test coverage  
3. **Follow code style** – Run `npm run lint` and `npm run format`  
4. **Update CHANGELOG** – Add your changes to `CHANGELOG.md`  
5. **One feature per PR** – Keep PRs focused and atomic  
6. **Descriptive PR title** – Use conventional commit format  

### PR Title Format

```
<type>(<scope>): <subject>

Examples:
feat(commands): add export command
fix(renderer): fix box alignment issue
docs(readme): update installation instructions
```

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type annotations
- Avoid `any` types when possible
- Use interfaces for public APIs

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use double quotes for strings
- Max line length: 100 characters
- Follow existing code patterns

### File Organization

```
src/
├── commands/     # Command implementations
├── plugins/      # Plugin system
├── render/       # Rendering components
├── shell/        # Shell engine
├── themes/       # Theme definitions
└── types.ts      # Type definitions
```

---

### Testing

- Write tests for new features
- Maintain or improve code coverage
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

Example:

```typescript
describe("Feature", () => {
  it("should do something specific", () => {
    // Arrange
    const input = "test";

    // Act
    const result = doSomething(input);

    // Assert
    expect(result).toBe("expected");
  });
});
```

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: New feature  
- **fix**: Bug fix  
- **docs**: Documentation changes  
- **style**: Code style changes (formatting, etc.)  
- **refactor**: Code refactoring  
- **test**: Adding or updating tests  
- **chore**: Maintenance tasks  

### Examples

```
feat(commands): add github stats command
fix(router): handle empty input correctly
docs(readme): add plugin development guide
test(config): add config validation tests
```

---

## Questions?

Feel free to:

- Open an issue for discussion
- Join community discussions
- Reach out to maintainers

---

Thank you for contributing! 🚀
