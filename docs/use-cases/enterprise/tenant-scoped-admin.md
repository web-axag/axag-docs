---
id: tenant-scoped-admin
title: "Enterprise: Tenant-Scoped Admin"
sidebar_label: Tenant-Scoped Admin
slug: /use-cases/enterprise/tenant-scoped-admin
---

# Enterprise: Tenant-Scoped Admin

## Problem Statement
Multi-tenant SaaS platforms require strict data isolation. Admin operations must be scoped to the current tenant, and agents must never access, modify, or even reference data from other tenants.

## Why Human-Only Semantics Fail
- Tenant context is stored in cookies/headers, not declared in the UI
- Admin panels don't show which tenant they operate on
- "Switch Organization" controls don't declare the scoping implications
- Cross-tenant operations have identical UI to same-tenant operations

## Why Scraping Fails Here
- Tenant ID is in JWT tokens or session state, not the DOM
- URL patterns may or may not include tenant identifiers
- Admin UIs are identical across tenants — only the data differs
- Cross-tenant access bugs are the #1 SaaS security vulnerability

## How AXAG Eliminates Scraping
`axag-scope="tenant"` and `axag-tenant-boundary="strict"` declare that every operation is tenant-scoped. Generated tools include tenant context automatically.

## Annotated UI Example
```html
<!-- Tenant-Scoped User Management -->
<button
  axag-intent="admin.list_users"
  axag-entity="user"
  axag-action-type="read"
  axag-required-parameters='[]'
  axag-optional-parameters='["role_filter","status_filter","page","page_size"]'
  axag-scope="tenant"
  axag-tenant-boundary="strict"
  axag-preconditions='["caller must have tenant_admin role"]'
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="List all users in the current tenant"
>Manage Users</button>

<!-- Tenant Settings -->
<button
  axag-intent="admin.update_tenant_settings"
  axag-entity="tenant_settings"
  axag-action-type="write"
  axag-required-parameters='["setting_key","setting_value"]'
  axag-preconditions='["caller must have tenant_admin role"]'
  axag-postconditions='["setting updated","audit log entry created"]'
  axag-scope="tenant"
  axag-tenant-boundary="strict"
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-idempotent="true"
  axag-side-effects='["audit_log","setting_propagation"]'
  axag-description="Update a tenant-level configuration setting"
>Save Settings</button>

<!-- Tenant Data Export (Compliance) -->
<button
  axag-intent="admin.export_tenant_data"
  axag-entity="tenant_data"
  axag-action-type="read"
  axag-required-parameters='["export_type"]'
  axag-optional-parameters='["date_range","format"]'
  axag-preconditions='["caller must have tenant_admin role","export must comply with data retention policy"]'
  axag-postconditions='["export job created"]'
  axag-scope="tenant"
  axag-tenant-boundary="strict"
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-async="true"
  axag-description="Export all tenant data for compliance or migration purposes"
>Export Tenant Data</button>
```

## Semantic Manifest Excerpt
```json
{
  "tenant_boundary": "strict",
  "scope": "tenant",
  "actions": [
    {
      "intent": "admin.list_users",
      "entity": "user",
      "action_type": "read",
      "operation_id": "admin_list_users",
      "description": "List all users in the current tenant",
      "required_parameters": [],
      "optional_parameters": [
        { "name": "role_filter", "type": "string" },
        { "name": "status_filter", "type": "string", "enum": ["active", "inactive", "suspended"] },
        { "name": "page", "type": "integer", "min": 1 },
        { "name": "page_size", "type": "integer", "min": 1, "max": 100 }
      ],
      "risk_level": "none",
      "idempotent": true,
      "preconditions": ["caller must have tenant_admin role"]
    },
    {
      "intent": "admin.update_tenant_settings",
      "entity": "tenant_settings",
      "action_type": "write",
      "operation_id": "admin_update_tenant_settings",
      "description": "Update a tenant-level configuration setting",
      "required_parameters": [
        { "name": "setting_key", "type": "string" },
        { "name": "setting_value", "type": "string" }
      ],
      "optional_parameters": [],
      "risk_level": "high",
      "confirmation_required": true,
      "idempotent": true,
      "side_effects": ["audit_log", "setting_propagation"],
      "preconditions": ["caller must have tenant_admin role"],
      "postconditions": ["setting updated", "audit log entry created"]
    },
    {
      "intent": "admin.export_tenant_data",
      "entity": "tenant_data",
      "action_type": "read",
      "operation_id": "admin_export_tenant_data",
      "description": "Export all tenant data for compliance or migration purposes",
      "required_parameters": [
        {
          "name": "export_type",
          "type": "string",
          "enum": ["full", "users_only", "audit_logs", "gdpr_request"]
        }
      ],
      "optional_parameters": [
        {
          "name": "date_range",
          "type": "object",
          "properties": {
            "start": { "type": "string", "format": "date" },
            "end": { "type": "string", "format": "date" }
          }
        },
        { "name": "format", "type": "string", "enum": ["json", "csv", "zip"], "default": "zip" }
      ],
      "risk_level": "high",
      "confirmation_required": true,
      "async": true,
      "preconditions": [
        "caller must have tenant_admin role",
        "export must comply with data retention policy"
      ],
      "postconditions": ["export job created"]
    }
  ]
}
```

## Constraints & Safety Notes
- **Strict tenant boundary**: AXAG runtime MUST enforce that no operation accesses data outside the current tenant
- All operations require `tenant_admin` role
- Settings changes propagate to all tenant users and are logged to audit trail
- Data export is async and may take minutes for large tenants
- `gdpr_request` export type follows GDPR compliance requirements
- Tenant boundary violations MUST be treated as critical security incidents
