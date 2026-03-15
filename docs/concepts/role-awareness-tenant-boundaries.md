---
id: role-awareness-tenant-boundaries
title: "Core Concept: Role Awareness and Tenant Boundaries"
sidebar_label: Role & Tenant Boundaries
slug: /concepts/role-awareness-tenant-boundaries
---

# Role Awareness and Tenant Boundaries

Operations in multi-tenant, role-based systems require explicit declarations of who can perform them and within what boundary.

## Role Awareness

```html
<button
  axag-intent="user.delete"
  axag-required-roles='["admin","super_admin"]'
  axag-role-escalation="false"
>
  Delete User
</button>
```

This declares that only `admin` and `super_admin` roles can invoke this operation, and role escalation is not permitted.

## Tenant Boundaries

```html
<div axag-scope="tenant" axag-tenant-context="current">
  <button
    axag-intent="settings.update"
    axag-entity="tenant_settings"
    axag-action-type="mutate"
    axag-cross-tenant="false"
  >
    Update Settings
  </button>
</div>
```

The `axag-cross-tenant="false"` declaration prevents agents from attempting cross-tenant operations.

## Why These Matter

Without role and tenant declarations:
- An agent might attempt admin operations with user-level credentials
- A multi-tenant agent might inadvertently operate across tenant boundaries
- Privilege escalation paths become invisible

## Next Steps

- [Specification Overview](/docs/specification/overview)
- [Context and Scope](/docs/concepts/context-and-scope)
