---
id: authorization-identity
title: Authorization and Identity
sidebar_label: Authorization & Identity
slug: /tool-generation/authorization-identity
---
# Authorization and Identity

Tool definitions carry role and tenant context from AXAG annotations, enabling agent runtimes to enforce access control.

## Role-Based Access
`axag-required-roles` becomes `metadata.required_roles`:
```json title="Role-based access control — tool metadata excerpt"
{
  "name": "user_delete",
  "metadata": {
    "action_type": "delete",
    "risk_level": "high",
    "required_roles": ["admin", "super_admin"],
    "source_intent": "user.delete",
    "source_entity": "user"
  }
}
```

## Tenant Isolation
`axag-scope` and `axag-tenant-boundary` become `metadata.scope` and `metadata.tenant_boundary`:
```json title="Tenant isolation — tool metadata excerpt"
{
  "name": "settings_update",
  "metadata": {
    "action_type": "write",
    "risk_level": "medium",
    "scope": "tenant",
    "tenant_boundary": "strict",
    "source_intent": "settings.update",
    "source_entity": "settings"
  }
}
```

Agent runtimes MUST validate the invoking identity's roles and tenant context before executing tools with access control metadata.
