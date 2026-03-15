---
id: authorization-identity
title: Authorization and Identity
sidebar_label: Authorization & Identity
slug: /tool-generation/authorization-identity
---
# Authorization and Identity

Tool definitions carry role and tenant context from AXAG annotations, enabling agent runtimes to enforce access control.

## Role-Based Access
```json title="Role-based access control"
{
  "tool_name": "user_delete",
  "safety": {
    "required_roles": ["admin", "super_admin"],
    "role_escalation": false
  }
}
```

## Tenant Isolation
```json title="Tenant isolation context"
{
  "tool_name": "settings_update",
  "safety": {
    "scope": "tenant",
    "cross_tenant": false,
    "tenant_context": "current"
  }
}
```

Agent runtimes MUST validate the invoking identity's roles and tenant context before executing tools with access control metadata.
