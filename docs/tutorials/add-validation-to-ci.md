---
id: add-validation-to-ci
title: "Tutorial: Add Validation to CI"
sidebar_label: Add Validation to CI
slug: /tutorials/add-validation-to-ci
---

# Tutorial: Add Validation to CI

This tutorial shows how to integrate AXAG validation into your CI/CD pipeline to catch annotation errors before deployment.

## Step 1: Install Dependencies

```bash title="Install AXAG dev dependencies"
npm install -D @axag/cli @axag/lint
```

## Step 2: Create Lint Configuration

Create `.axag-lint.json`:

```json title=".axag-lint.json" showLineNumbers
{
  "extends": "@axag/lint/recommended",
  "rules": {
    "AXAG-LINT-001": "error",
    "AXAG-LINT-002": "error",
    "AXAG-LINT-003": "error",
    "AXAG-LINT-006": "error",
    "AXAG-LINT-007": "warn"
  },
  "manifestPath": "./axag-manifest.json",
  "ignorePatterns": ["**/*.test.*", "**/*.spec.*"]
}
```

## Step 3: Add npm Scripts

```json title="package.json — AXAG scripts"
{
  "scripts": {
    "axag:scan": "axag scan --input src/ --output axag-manifest.json",
    "axag:lint": "axag lint src/ --config .axag-lint.json",
    "axag:validate": "axag validate-manifest axag-manifest.json",
    "axag:conformance": "axag conformance --manifest axag-manifest.json --level intermediate",
    "axag:check": "npm run axag:scan && npm run axag:lint && npm run axag:validate && npm run axag:conformance"
  }
}
```

## Step 4: GitHub Actions Workflow

Create `.github/workflows/axag-validation.yml`:

```yaml title=".github/workflows/axag-validation.yml" showLineNumbers
name: AXAG Validation

on:
  pull_request:
    paths:
      - 'src/**'
      - 'axag-manifest.json'
      - '.axag-lint.json'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Scan annotations
        run: npm run axag:scan

      - name: Lint annotations
        run: npm run axag:lint -- --format github

      - name: Validate manifest
        run: npm run axag:validate

      - name: Check conformance
        run: npm run axag:conformance

      - name: Upload manifest artifact
        uses: actions/upload-artifact@v4
        with:
          name: axag-manifest
          path: axag-manifest.json
```

## Step 5: Add Pre-Commit Hook

```bash title="Add pre-commit hook"
npx husky add .husky/pre-commit "npm run axag:lint -- --staged"
```

## Step 6: Add Status Badge

```markdown title="README.md badge"
![AXAG Validation](https://github.com/your-org/your-repo/actions/workflows/axag-validation.yml/badge.svg)
```

## Troubleshooting

### CI fails with AXAG-LINT-010 (Intent not found in manifest)

The manifest may be out of date. Run `npm run axag:scan` to regenerate it.

### CI fails with conformance check

Your annotations don't meet the target conformance level. Run with `--verbose` to see which fields are missing:

```bash title="Debug conformance failures"
npx axag conformance --manifest axag-manifest.json --level intermediate --verbose
```
