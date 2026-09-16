---
id: ci-linting
title: CI/CD Linting
sidebar_label: CI/CD Linting
slug: /validation/ci-linting
---

# CI/CD Linting

Integrating AXAG validation into your CI/CD pipeline ensures that annotation errors are caught before deployment. This page shows how to set up automated linting with GitHub Actions, GitLab CI, and other platforms.

## GitHub Actions Workflow

```yaml title=".github/workflows/axag-validation.yml" showLineNumbers
name: AXAG Validation

on:
  pull_request:
    paths:
      - 'src/**'
      - 'axag-manifest.json'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Generate and validate the manifest
        run: npx axag generate src --manifest axag-manifest.json --validate

      - name: Run AXAG lint rules
        run: npx axag-lint src --manifest axag-manifest.json --format github

      - name: Check conformance level
        run: npx axag validate src --level intermediate --strict
```

## GitLab CI Configuration

```yaml title=".gitlab-ci.yml"
axag-validate:
  stage: test
  image: node:20
  script:
    - npm ci
    - npx axag generate src --manifest axag-manifest.json --validate
    - npx axag-lint src --manifest axag-manifest.json --format json
  rules:
    - changes:
        - src/**
        - axag-manifest.json
```

## Lint Configuration File

Create `.axaglintrc.json` in your project root, or put the same object under an `"axag-lint"` key in `package.json`. Anything you leave out keeps its default.

```json title=".axaglintrc.json" showLineNumbers
{
  "include": ["**/*.{html,htm,jsx,tsx,vue}"],
  "exclude": ["node_modules/**", "dist/**", "build/**", "**/*.test.*"],
  "manifestPath": "./axag-manifest.json",
  "rules": {
    "AXAG-LINT-025": "off",
    "AXAG-LINT-031": "warning",
    "AXAG-LINT-032": "off"
  }
}
```

Each rule takes `"error"`, `"warning"`, `"info"` or `"off"`. Run `npx axag-lint --init` to write the file with every rule at its default severity.

### What the rules cover

| Rules | Cover |
|-------|-------|
| 001–003, 034–035 | Identity: intent, entity and action type present and correctly shaped |
| 004–005 | Enum values |
| 006–007, 023–026 | Safety: risk, confirmation, approval, idempotency |
| 008–009 | Parameters |
| 010 | Cross-reference against the manifest (needs `manifestPath`) |
| 011, 018–022 | Scope and tenancy |
| 012–016 | Contradictions between attributes |
| 017 | Unsafe mutations |
| 027–028 | Macro syntax and macro/longhand conflicts |
| 029–032 | Harvesting: unnamed controls, schema drift, accessible names, labels |
| 033 | Annotations that only exist at runtime |

The full list with default severities is in the [axag-lint README](https://www.npmjs.com/package/@web-axag/axag-lint).

## Pre-Commit Hook

Use Husky to validate annotations before commit:

```bash title=".husky/pre-commit"
# .husky/pre-commit — lint the files about to be committed
git diff --cached --name-only --diff-filter=ACM \
  | grep -E '\.(html|htm|jsx|tsx|vue)$' \
  | xargs -r npx axag-lint
```

## CI Output Formats

The `--format` flag controls output format:

| Format | Use Case |
|--------|----------|
| `console` | Local terminal output (default) |
| `github` | GitHub Actions annotations, shown inline on the PR |
| `json` | Machine-readable for custom tooling |

`--quiet` shows errors only, and `--manifest <path>` turns on the rules that compare annotations with a generated manifest.

## Enforcing Conformance Levels in CI

```bash
# Fail on annotations below a level (basic | intermediate | full)
npx axag validate src --level intermediate --strict
```

`axag validate` exits with code 1 when an annotation misses what the level requires, blocking the pipeline. The manifest also records the level it reached in its `conformance` field, so `axag generate --validate` shows where a codebase stands without failing the build.
