---
id: context-and-scope
title: "Core Concept: Context and Scope"
sidebar_label: Context and Scope
slug: /concepts/context-and-scope
---

# Context and Scope

**Scope** defines the boundary within which an operation executes. **Context** provides the environmental information needed for execution.

## Scope Levels

| Scope | Description | Example |
|-------|-------------|---------|
| `global` | Accessible to all users | Public product search |
| `catalog` | Scoped to a product catalog | Category-specific search |
| `tenant` | Scoped to an organizational tenant | Multi-tenant SaaS operations |
| `organization` | Scoped to an organization | Team-level settings |
| `user` | Scoped to an individual user | Profile updates |
| `session` | Scoped to an active session | Cart operations |
| `customer` | Scoped to a customer account | Order history |

## Why Scope Matters

An agent operating within a multi-tenant SaaS product must know that `tenant` scope means operations are isolated to the current tenant. Without this declaration, an agent might attempt cross-tenant operations that should be forbidden.

## Context Inheritance

AXAG supports context inheritance — child elements can inherit scope from parent containers:

```html
<div axag-scope="tenant" axag-tenant-id="acme-corp">
  <button axag-intent="user.create" axag-entity="user" axag-action-type="create">
    Add User
  </button>
  <!-- This button inherits scope="tenant" and tenant-id="acme-corp" -->
</div>
```

## Next Steps

- [Visibility vs Operability](/docs/concepts/visibility-vs-operability)
- [Role Awareness and Tenant Boundaries](/docs/concepts/role-awareness-tenant-boundaries)
