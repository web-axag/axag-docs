---
id: manifest-fields
title: Manifest Fields Reference
sidebar_label: Manifest Fields
slug: /reference/manifest-fields
---

# Manifest Fields Reference

Complete field reference for the AXAG Semantic Manifest JSON document.

## Top-Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | MUST | Spec version (e.g., `"1.0.0"`) |
| `entities` | Entity[] | MUST | Array of entity definitions |
| `metadata` | Metadata | MAY | Generation metadata |

## Metadata Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `generator` | string | MAY | Tool that generated the manifest |
| `generated_at` | string (ISO 8601) | MAY | Timestamp of generation |
| `source_url` | string (URI) | MAY | URL of the annotated source |
| `checksum` | string | MAY | SHA-256 hash of manifest content |

## Entity Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | MUST | Entity name (snake_case) |
| `description` | string | SHOULD | Human-readable entity description |
| `actions` | Action[] | MUST | Array of actions on this entity |

## Action Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `intent` | string | MUST | `entity.action` identifier |
| `operation_id` | string | SHOULD | Unique operation ID (snake_case) |
| `action_type` | string | MUST | `read`, `write`, or `delete` |
| `description` | string | SHOULD | Human-readable description |
| `parameters` | Parameters | SHOULD | Parameter definitions |
| `risk_level` | string | SHOULD | `none`/`low`/`medium`/`high`/`critical` |
| `idempotent` | boolean | SHOULD | Safe to retry? |
| `confirmation_required` | boolean | SHOULD | User confirmation needed? |
| `approval_required` | boolean | MAY | Role-based approval needed? |
| `approval_roles` | string[] | MUST (if approval) | Roles that can approve |
| `preconditions` | string[] | MAY | Pre-execution conditions |
| `postconditions` | string[] | MAY | Post-execution guarantees |
| `side_effects` | string[] | MAY | External side-effects |
| `scope` | string | SHOULD | Data access scope |
| `tenant_boundary` | string | MAY | `strict` or `relaxed` |
| `async` | boolean | MAY | Asynchronous operation? |

## Parameter Definition Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | MUST | JSON Schema type |
| `required` | boolean | MUST | Is this parameter required? |
| `description` | string | MAY | Parameter description |
| `enum` | any[] | MAY | Allowed values |
| `minimum` | number | MAY | Minimum numeric value |
| `maximum` | number | MAY | Maximum numeric value |
| `minLength` | integer | MAY | Minimum string length |
| `maxLength` | integer | MAY | Maximum string length |
| `pattern` | string | MAY | Regex pattern for validation |
| `format` | string | MAY | `email`, `uri`, `date`, `date-time` |
| `default` | any | MAY | Default value if not provided |
| `items` | object | MAY | Array item schema (when type=array) |
| `properties` | object | MAY | Nested object properties (when type=object) |

## Example Manifest

```json
{
  "version": "1.0.0",
  "metadata": {
    "generator": "axag-cli",
    "generated_at": "2024-01-15T10:30:00Z",
    "source_url": "https://example.com"
  },
  "entities": [
    {
      "name": "product",
      "description": "Product catalog entity",
      "actions": [
        {
          "intent": "product.search",
          "operation_id": "product_search",
          "action_type": "read",
          "description": "Search the product catalog",
          "parameters": {
            "query": { "type": "string", "required": true },
            "category": { "type": "string", "required": false }
          },
          "risk_level": "none",
          "idempotent": true,
          "scope": "public"
        }
      ]
    }
  ]
}
```
