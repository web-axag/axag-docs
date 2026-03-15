# Contributing to AXAG

Thank you for your interest in contributing to the AXAG Standard documentation!

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR-USERNAME/mcp-agentify.git`
3. **Install** dependencies: `cd axag && npm install`
4. **Create a branch**: `git checkout -b feature/your-feature`
5. **Start** the dev server: `npm start`

## Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Validate examples
npm run validate

# Lint
npm run lint
```

## Pull Request Process

1. Ensure your changes build without errors: `npm run build`
2. Run validation: `npm run validate`
3. Follow the [Style Guide](docs/contributors/style-guide.md)
4. Use the [Review Checklist](docs/contributors/review-checklist.md) for self-review
5. Submit a PR with a clear description and link to the related issue

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

docs(use-cases): add healthcare domain examples
fix(spec): correct constraint schema
feat(components): add InteractiveExample component
chore(deps): update docusaurus
```

## Adding Use Cases

See the [Adding Use Cases guide](docs/contributors/adding-use-cases.md) for detailed instructions on contributing domain-specific examples.

## Proposing Specification Changes

1. Open an issue describing the proposed change
2. Write an RFC document
3. Submit a PR and tag maintainers for review
4. Changes require at least two maintainer approvals

## Code of Conduct

- Be respectful and constructive
- Welcome diverse perspectives
- Focus on improving the standard
- Be patient with the review process

## Questions?

Open an issue or start a discussion on GitHub.
