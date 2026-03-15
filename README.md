# AXAG — Agent Context Annotation Guidelines

[![Build](https://img.shields.io/github/actions/workflow/status/me-saurabhkohli/mcp-agentify/ci.yml?branch=main&label=build)](https://github.com/me-saurabhkohli/mcp-agentify/actions)
[![Version](https://img.shields.io/badge/version-0.1.0--draft-orange)](https://axag.dev)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**AXAG** is a semantic annotation standard that makes web UIs machine-readable for AI agents. Instead of scraping ambiguous HTML, agents consume structured semantic manifests generated from AXAG annotations.

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/me-saurabhkohli/mcp-agentify.git
cd mcp-agentify/axag
npm install

# Start development server
npm start
```

Visit `http://localhost:3000` to view the documentation site.

## 📖 What is AXAG?

AXAG defines a vocabulary of HTML data attributes (`axag-*`) that encode:

- **Intent** — what the action does (`product.search`, `order.place`)
- **Entity** — the domain object (`product`, `order`, `ticket`)
- **Action type** — the operation class (`read`, `write`, `delete`)
- **Parameters** — required and optional inputs
- **Constraints** — validation rules (enums, ranges, formats)
- **Safety metadata** — risk level, confirmation, approval requirements

### Example

```html
<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-required-parameters='["query"]'
  axag-optional-parameters='["category","price_min","price_max"]'
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Search the product catalogue"
>Search</button>
```

This annotation generates a **semantic manifest** (JSON) which is then transformed into an **MCP tool** that any AI agent can discover and invoke.

## 🏗 Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐     ┌───────────┐
│  HTML + AXAG │ ──▶ │ Semantic Manifest │ ──▶ │  MCP Tools  │ ──▶ │ AI Agent  │
│  Annotations │     │     (JSON)        │     │ (Generated) │     │           │
└─────────────┘     └──────────────────┘     └─────────────┘     └───────────┘
```

## 📚 Documentation Structure

| Section | Description |
|---------|-------------|
| **Introduction** | What AXAG is and why it exists |
| **Getting Started** | First annotation to first agent action |
| **Core Concepts** | Foundational ideas (semantic contracts, affordances, trust) |
| **Specification** | Formal vocabulary, attributes, conformance levels |
| **Semantic Manifest** | Manifest schema, generation, and discovery |
| **Tool Generation** | Mapping rules and generated tool examples |
| **Authoring Guide** | How to annotate buttons, forms, tables, workflows |
| **Use Cases** | 8 industry domains with 25+ annotated examples |
| **Validation** | Static, runtime, and CI validation |
| **Governance** | Versioning, deprecation, RFC process |
| **Reference** | Schema reference, glossary, error codes |
| **Tutorials** | Step-by-step guides |
| **Examples** | Before/after, anti-patterns, domain gallery |
| **FAQ** | Frequently asked questions |

## 🛠 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Production build |
| `npm run validate` | Validate AXAG examples |
| `npm run lint` | Lint documentation |
| `npm run format` | Format code |

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📋 Implementation Roadmap

### Top 10 Next Implementation Tasks

| # | Task | Priority | Effort |
|---|------|----------|--------|
| 1 | **Build and publish the `axag-lint` CLI** — implement the linting rules referenced throughout the docs (AXAG-LINT-001 through AXAG-LINT-026) as a real npm package | Critical | Large |
| 2 | **Create the JSON Schema for Semantic Manifests** — a machine-readable schema that validates manifest files against the specification | Critical | Medium |
| 3 | **Build the Manifest Generator** — a tool that scans HTML/JSX/TSX files for `axag-*` attributes and emits `axag-manifest.json` | Critical | Large |
| 4 | **Build the MCP Tool Generator** — reads a semantic manifest and generates MCP-compliant tool definitions with input schemas | High | Medium |
| 5 | **Publish to axag.dev** — configure DNS, deploy via GitHub Pages or Vercel, enable versioned docs | High | Small |
| 6 | **Create a VS Code extension** — syntax highlighting and IntelliSense for `axag-*` attributes | High | Medium |
| 7 | **Write real integration tests** — annotate a sample app (React + Express), generate manifest, generate tools, run agent | High | Large |
| 8 | **Build the Discovery API endpoint** — `/.well-known/axag-manifest.json` server middleware for Express/Next.js | Medium | Small |
| 9 | **Create framework adapters** — React `<AXAGButton>`, Angular directive, Vue composable | Medium | Medium |
| 10 | **Establish governance and RFC process** — set up GitHub Discussions, RFC template, and CODEOWNERS | Medium | Small |

### Repo Bootstrap Checklist

- [x] Initialize Docusaurus project with TypeScript
- [x] Configure `docusaurus.config.ts` (metadata, navbar, footer, Mermaid, Prism)
- [x] Create custom CSS theme
- [x] Build 6 custom React components (SchemaFieldTable, NormativeCallout, ProposedPattern, BeforeAfter, ConformanceBadge, AudienceBanner)
- [x] Create homepage with architecture diagram and feature cards
- [x] Write all 144 documentation pages across 16 sections
- [x] Configure sidebar navigation (`sidebars.ts`)
- [x] Add versioned docs support (`0.1.0-draft`)
- [x] Write `CONTRIBUTING.md` and contributor guide
- [x] Create GitHub Actions CI workflow (lint, build, validate)
- [x] Create AXAG example validation script (`validate-axag-examples.mjs`)
- [x] Add ADR for Docusaurus selection
- [x] Create `README.md` with project overview
- [x] Verify build passes cleanly (145 pages, 0 errors)
- [x] Verify all pages render with correct navigation
- [ ] Register `axag.dev` domain and deploy
- [ ] Add `LICENSE` file
- [ ] Initialize `CHANGELOG.md`
- [ ] Enable GitHub Discussions
- [ ] Set up `CODEOWNERS` file

### Content Gap Analysis (Future Expansion)

| Area | Current State | Future Work |
|------|--------------|-------------|
| **Framework adapters** | Proposed patterns only | Build real React/Angular/Vue packages |
| **axag-lint CLI** | Rules documented, no implementation | Build npm package with all 26+ rules |
| **Manifest Generator** | Conceptual docs | Build scanner + generator tool |
| **MCP Tool Generator** | Examples and mapping rules | Build code generator |
| **API Reference** | Manual docs | Auto-generate from JSON Schema |
| **Real-world case studies** | Hypothetical domain examples | Partner with teams for real implementations |
| **Internationalization** | English only | Add i18n support (Docusaurus built-in) |
| **Video tutorials** | None | Record getting-started and deep-dive videos |
| **Playground / REPL** | None | Build interactive annotation playground |
| **Conformance test suite** | Validation script for docs only | Full conformance test suite for implementations |
| **JSON-LD format** | Proposed pattern | Evaluate and possibly standardize |
| **WebComponent support** | Not covered | Document Shadow DOM annotation strategy |

### Risks and Assumptions Log

| # | Risk / Assumption | Impact | Mitigation |
|---|-------------------|--------|------------|
| 1 | **Assumption**: Developers will adopt `axag-*` HTML attributes | If adoption is low, the standard fails | Start with framework adapters that abstract the attributes |
| 2 | **Risk**: Attribute namespace collision with other libraries | Elements may have conflicting `axag-*` attrs | The `axag-` prefix is reserved; document collision avoidance |
| 3 | **Assumption**: MCP becomes the dominant agent tool protocol | If MCP loses traction, tool generation is less valuable | Keep tool generation layer-agnostic; support OpenAPI, LangChain |
| 4 | **Risk**: Specification scope creep | Trying to cover every edge case delays 1.0 | Keep 0.1.0 focused on core attributes; use proposed patterns for extensions |
| 5 | **Assumption**: AI agents will prefer structured contracts over scraping | Agents may improve at scraping, reducing AXAG's value | AXAG provides determinism and safety that scraping cannot — emphasize this |
| 6 | **Risk**: No governance body established | Without governance, the spec may fragment | Establish RFC process and CODEOWNERS before 1.0 |
| 7 | **Risk**: Documentation drifts from implementation | Docs describe features that don't exist | Validate docs against real implementations; add integration tests |
| 8 | **Assumption**: WCAG and AXAG are complementary, not competing | Accessibility teams may see AXAG as redundant | Clearly document that ARIA ≠ AXAG; they serve different audiences |

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
