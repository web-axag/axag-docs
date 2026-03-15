---
id: adr-001-docusaurus
title: "ADR 001: Docusaurus as Documentation Platform"
sidebar_label: "ADR 001: Docusaurus"
slug: /adr/001-docusaurus
---

# ADR 001: Docusaurus as Documentation Platform

## Status

**Accepted** — 2024-01

## Context

The AXAG standard requires a documentation platform that supports:

1. **Versioned documentation** — the spec evolves across versions
2. **MDX support** — interactive components embedded in documentation
3. **Sidebar navigation** — deep information architecture (16+ categories)
4. **Code syntax highlighting** — HTML, JSON, TypeScript, YAML examples
5. **Diagram support** — architecture and flow diagrams
6. **Search** — full-text search across all documentation
7. **SEO** — discoverability for standard adoption
8. **Static site generation** — fast, deployable to any CDN
9. **Developer familiarity** — React/TypeScript ecosystem

## Decision

We will use **Docusaurus 3.x** as the documentation platform.

## Rationale

### Evaluated Options

| Criterion | Docusaurus | VitePress | MkDocs | GitBook |
|-----------|-----------|-----------|--------|---------|
| Versioned docs | ✅ Built-in | ❌ Manual | ⚠️ Plugin | ✅ Built-in |
| MDX / React components | ✅ Native | ❌ Vue only | ❌ No | ❌ Limited |
| Sidebar depth | ✅ Unlimited | ✅ Good | ✅ Good | ⚠️ Limited |
| Mermaid diagrams | ✅ Plugin | ✅ Plugin | ✅ Plugin | ✅ Built-in |
| Static site | ✅ Yes | ✅ Yes | ✅ Yes | ❌ Hosted |
| TypeScript | ✅ Native | ✅ Native | ❌ Python | ❌ N/A |
| Community | ✅ Large | ✅ Growing | ✅ Large | ⚠️ Proprietary |

### Why Docusaurus

- **Versioned docs** out of the box — critical for a specification that evolves
- **MDX support** — enables interactive components like `SchemaFieldTable`, `NormativeCallout`, `BeforeAfter` directly in documentation
- **React ecosystem** — team familiarity, rich component library
- **Proven at scale** — used by React, Jest, Babel, many other open source projects
- **Plugin architecture** — Mermaid, search, analytics all available

### Trade-offs

- Heavier than VitePress for simple sites (acceptable for our complexity)
- React-specific (acceptable given team skills)
- Build times increase with page count (mitigated by incremental builds)

## Consequences

- All documentation written in Markdown/MDX
- Custom interactive components built with React/TypeScript
- Deployable to GitHub Pages, Vercel, Netlify, or any static host
- Contributors need basic React knowledge for MDX components
- Configuration in `docusaurus.config.ts` and `sidebars.ts`
