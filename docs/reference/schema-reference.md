---
id: schema-reference
title: Schema Reference
sidebar_label: Schema Reference
slug: /reference/schema-reference
---

# Schema Reference

Complete JSON Schema reference for all AXAG artifacts.

## Annotation Attribute Schema

Every AXAG-annotated HTML element uses the following attributes:

### Required Attributes

| Attribute | Type | Values | Description |
|-----------|------|--------|-------------|
| `axag-intent` | string | `entity.action` pattern | Canonical intent identifier |
| `axag-entity` | string | snake_case | Entity this action operates on |
| `axag-action-type` | string | `read` \| `write` \| `delete` | Operation category |

### Recommended Attributes

| Attribute | Type | Values | Description |
|-----------|------|--------|-------------|
| `axag-description` | string | Free text | Human-readable action description |
| `axag-risk-level` | string | `none` \| `low` \| `medium` \| `high` \| `critical` | Risk classification |
| `axag-idempotent` | boolean | `true` \| `false` | Whether repeated calls are safe |
| `axag-required-parameters` | JSON array | `["param1","param2"]` | Parameters that MUST be provided |
| `axag-optional-parameters` | JSON array | `["param1","param2"]` | Parameters that MAY be provided |

### Safety Attributes

| Attribute | Type | Values | Description |
|-----------|------|--------|-------------|
| `axag-confirmation-required` | boolean | `true` \| `false` | Whether user confirmation is needed |
| `axag-approval-required` | boolean | `true` \| `false` | Whether role-based approval is needed |
| `axag-approval-roles` | JSON array | `["role1","role2"]` | Roles authorized to approve |
| `axag-preconditions` | JSON array | `["condition"]` | Conditions that MUST be true before execution |
| `axag-postconditions` | JSON array | `["condition"]` | Conditions guaranteed after successful execution |
| `axag-side-effects` | JSON array | `["effect"]` | Side-effects of execution |

### Scope Attributes

| Attribute | Type | Values | Description |
|-----------|------|--------|-------------|
| `axag-scope` | string | `public` \| `user` \| `tenant` \| `global` | Data access scope |
| `axag-tenant-boundary` | string | `strict` \| `relaxed` | Tenant isolation enforcement |

### Execution Attributes

| Attribute | Type | Values | Description |
|-----------|------|--------|-------------|
| `axag-async` | boolean | `true` \| `false` | Whether operation is asynchronous |

## Manifest Schema

See [Schema Conformance](/docs/validation/schema-conformance) for the full JSON Schema definition.

## Tool Schema

Generated MCP tools follow this structure:

```json
{
  "tool_name": "entity_action",
  "description": "Description of the action",
  "input_schema": {
    "type": "object",
    "properties": {
      "param_name": { "type": "string", "description": "Parameter description" }
    },
    "required": ["param_name"]
  },
  "safety": {
    "risk_level": "medium",
    "idempotent": true,
    "confirmation_required": true,
    "approval_required": false,
    "side_effects": ["state_change"],
    "preconditions": ["entity exists"]
  }
}
```
