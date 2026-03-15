---
id: implementation-prerequisites
title: Implementation Prerequisites
sidebar_label: Prerequisites
slug: /getting-started/implementation-prerequisites
description: What you need before implementing AXAG in your product.
keywords: [prerequisites, requirements, setup]
---

# Implementation Prerequisites

Before implementing AXAG, ensure the following prerequisites are in place.

## Technical Prerequisites

1. **Frontend framework** — Any modern framework (React, Vue, Angular, Svelte, plain HTML) is supported
2. **Build toolchain** — A build process that can run extraction plugins (Webpack, Vite, Rollup, esbuild, or similar)
3. **JSON processing** — Ability to generate and serve JSON manifest files
4. **CI/CD pipeline** — For running validation and manifest generation on each build

## Organizational Prerequisites

1. **Vocabulary ownership** — Identify who owns the intent and entity vocabulary for your product
2. **Governance model** — Define who reviews and approves changes to annotations
3. **Agent consumer identification** — Know which agent runtimes will consume your semantic contracts
4. **Risk classification policy** — Define how your organization classifies operation risk levels

## Recommended Knowledge

- Familiarity with HTML data attributes
- Understanding of JSON Schema
- Basic knowledge of the Model Context Protocol (MCP)
- Understanding of your product's domain entities and operations

## Next Steps

- [Core Concepts](/docs/concepts/agent-experience)
- [Authoring Guide](/docs/authoring-guide/annotating-buttons)
- [Specification Overview](/docs/specification/overview)
