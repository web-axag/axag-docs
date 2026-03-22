---
id: generate-semantic-manifest
title: "Tutorial: Generate a Semantic Manifest"
sidebar_label: Generate Semantic Manifest
slug: /tutorials/generate-semantic-manifest
---

# Tutorial: Generate a Semantic Manifest

This tutorial walks through generating an AXAG Semantic Manifest from annotated HTML/JSX source files.

## Prerequisites
- Source files with AXAG annotations (see [Add AXAG to a Page](/docs/tutorials/add-axag-to-page))
- Node.js 18+

## Step 1: Install the CLI

```bash title="Install AXAG CLI"
npm install -D @axag/cli
```

## Step 2: Scan Source Files

```bash title="Scan & generate manifest"
npx axag scan --input src/ --output axag-manifest.json
```

The scanner:
1. Finds all files with `axag-*` attributes (.html, .jsx, .tsx, .vue, .svelte)
2. Extracts annotation data from each element
3. Groups actions by entity
4. Outputs a structured Semantic Manifest

## Step 3: Review the Generated Manifest

```json title="axag-manifest.json" showLineNumbers
{
  "version": "1.0.0",
  "metadata": {
    "generator": "@axag/cli@1.0.0",
    "generated_at": "2024-01-15T10:30:00Z",
    "source_files": ["src/SearchPage.tsx", "src/CartPage.tsx", "src/AdminPage.tsx"]
  },
  "entities": [
    {
      "name": "product",
      "actions": [
        {
          "intent": "product.search",
          "operation_id": "product_search",
          "action_type": "read",
          "description": "Search the product catalog",
          "parameters": {
            "query": { "type": "string", "required": true }
          },
          "risk_level": "none",
          "idempotent": true
        }
      ]
    }
  ]
}
```

## Step 4: Validate the Manifest

```bash title="Validate manifest"
npx axag validate-manifest axag-manifest.json
```

Expected output:
```bash title="Validation output"
✓ Manifest schema is valid
✓ All intents follow naming convention
✓ All required fields present
✓ 12 actions across 4 entities
```

## Step 5: Serve the Manifest

Make the manifest discoverable by agents:

### Option A: Well-Known URL
```http title="Well-known endpoint"
https://yoursite.com/.well-known/axag-manifest.json
```

### Option B: HTTP Header
```http title="HTTP Link header"
Link: </.well-known/axag-manifest.json>; rel="axag-manifest"
```

### Option C: HTML Meta Tag
```html title="HTML meta tag"
<meta name="axag-manifest" content="/.well-known/axag-manifest.json">
```

## Step 6: Automate in CI

```yaml title=".github/workflows/axag.yml" showLineNumbers
# .github/workflows/axag.yml
- name: Generate manifest
  run: npx axag scan --input src/ --output axag-manifest.json

- name: Validate manifest
  run: npx axag validate-manifest axag-manifest.json

- name: Deploy manifest
  run: cp axag-manifest.json public/.well-known/axag-manifest.json
```

## Next Steps
- [Generate MCP Tools](/docs/tutorials/generate-mcp-tools) from the manifest
- [Add Validation to CI](/docs/tutorials/add-validation-to-ci)
