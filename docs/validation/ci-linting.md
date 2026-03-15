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

      - name: Run AXAG static validation
        run: npx axag-validate --input src/ --manifest axag-manifest.json --format github

      - name: Run AXAG lint rules
        run: npx axag-lint src/ --config .axag-lint.json --format github

      - name: Validate manifest schema
        run: npx axag-validate-manifest axag-manifest.json --schema axag-manifest-schema.json

      - name: Check conformance level
        run: npx axag-conformance --manifest axag-manifest.json --level intermediate
```

## GitLab CI Configuration

```yaml title=".gitlab-ci.yml"
axag-validate:
  stage: test
  image: node:20
  script:
    - npm ci
    - npx axag-validate --input src/ --manifest axag-manifest.json
    - npx axag-lint src/ --config .axag-lint.json
  rules:
    - changes:
        - src/**
        - axag-manifest.json
```

## Lint Configuration File

Create `.axag-lint.json` in your project root:

```json title=".axag-lint.json" showLineNumbers
{
  "extends": "axag-lint/recommended",
  "rules": {
    "AXAG-LINT-001": "error",
    "AXAG-LINT-002": "error",
    "AXAG-LINT-003": "error",
    "AXAG-LINT-004": "error",
    "AXAG-LINT-005": "error",
    "AXAG-LINT-006": "error",
    "AXAG-LINT-007": "warn",
    "AXAG-LINT-008": "error",
    "AXAG-LINT-009": "error",
    "AXAG-LINT-010": "warn",
    "AXAG-LINT-011": "warn",
    "AXAG-LINT-012": "error"
  },
  "ignorePatterns": [
    "src/**/*.test.*",
    "src/**/*.spec.*"
  ],
  "manifestPath": "./axag-manifest.json"
}
```

## Pre-Commit Hook

Use Husky to validate annotations before commit:

```bash title=".husky/pre-commit"
# .husky/pre-commit
npx axag-lint --staged --config .axag-lint.json
```

## CI Output Formats

The `--format` flag controls output format:

| Format | Use Case |
|--------|----------|
| `text` | Local terminal output (default) |
| `github` | GitHub Actions annotations (inline PR comments) |
| `gitlab` | GitLab Code Quality report |
| `json` | Machine-readable for custom tooling |
| `junit` | JUnit XML for CI dashboard integration |
| `sarif` | SARIF format for GitHub Security tab |

## Enforcing Conformance Levels in CI

```bash
# Require basic conformance (mandatory fields only)
npx axag-conformance --manifest axag-manifest.json --level basic

# Require intermediate conformance (includes optional best practices)
npx axag-conformance --manifest axag-manifest.json --level intermediate

# Require full conformance (all fields, all safety metadata)
npx axag-conformance --manifest axag-manifest.json --level full
```

The conformance check exits with code 1 if the manifest doesn't meet the required level, blocking the CI pipeline.
