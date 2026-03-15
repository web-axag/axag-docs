---
id: crud-dashboard
title: "Enterprise: CRUD Dashboard"
sidebar_label: CRUD Dashboard
slug: /use-cases/enterprise/crud-dashboard
---

# Enterprise: CRUD Dashboard

## Problem Statement
Enterprise CRUD dashboards are the backbone of internal tools — managing users, products, configurations, and records. Agents need to perform create, read, update, and delete operations across diverse entity types with role-based access.

## Why Human-Only Semantics Fail
- CRUD tables use DataGrid components with inline editing
- Column sorting, filtering, and pagination are interactive but undeclared
- "Edit" and "Delete" buttons on each row don't declare the entity or record ID
- Bulk operations (select all + delete) have no declared safety boundaries

## Why Scraping Fails Here
- DataGrid components virtualize rows (only visible rows are in the DOM)
- Inline edit mode changes the DOM structure dynamically
- Pagination may use cursor-based pagination with no page count
- Role-based visibility hides columns/buttons that aren't in the DOM at all

## How AXAG Eliminates Scraping
Each CRUD operation is annotated with entity type, parameters, risk level, and role requirements. Agents use the generated tools without parsing table DOM.

## Annotated UI Examples
```html
<!-- List / Read -->
<button
  axag-intent="entity.list"
  axag-entity="user"
  axag-action-type="read"
  axag-required-parameters='[]'
  axag-optional-parameters='["page","page_size","sort_by","sort_order","filters"]'
  axag-scope="tenant"
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="List users with optional filtering and pagination"
>View Users</button>

<!-- Create -->
<button
  axag-intent="entity.create"
  axag-entity="user"
  axag-action-type="write"
  axag-required-parameters='["email","role"]'
  axag-optional-parameters='["first_name","last_name","department","phone"]'
  axag-preconditions='["caller must have user_admin role"]'
  axag-postconditions='["user created","welcome email sent"]'
  axag-risk-level="medium"
  axag-idempotent="false"
  axag-scope="tenant"
  axag-description="Create a new user in the system"
>Add User</button>

<!-- Update -->
<button
  axag-intent="entity.update"
  axag-entity="user"
  axag-action-type="write"
  axag-required-parameters='["user_id"]'
  axag-optional-parameters='["email","role","first_name","last_name","department","status"]'
  axag-preconditions='["caller must have user_admin role","user must exist"]'
  axag-risk-level="medium"
  axag-idempotent="true"
  axag-scope="tenant"
  axag-description="Update an existing user record"
>Edit User</button>

<!-- Delete -->
<button
  axag-intent="entity.delete"
  axag-entity="user"
  axag-action-type="delete"
  axag-required-parameters='["user_id"]'
  axag-preconditions='["caller must have user_admin role","user must not have active sessions"]'
  axag-postconditions='["user deactivated","sessions invalidated"]'
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-idempotent="true"
  axag-scope="tenant"
  axag-description="Delete (deactivate) a user from the system"
>Delete User</button>
```

## Generated Tool Examples
```json
[
  {
    "tool_name": "user_list",
    "description": "List users with optional filtering and pagination",
    "input_schema": {
      "type": "object",
      "properties": {
        "page": { "type": "integer", "minimum": 1 },
        "page_size": { "type": "integer", "minimum": 1, "maximum": 100 },
        "sort_by": { "type": "string" },
        "sort_order": { "type": "string", "enum": ["asc","desc"] },
        "filters": { "type": "object" }
      }
    },
    "safety": { "risk_level": "none", "idempotent": true }
  },
  {
    "tool_name": "user_create",
    "description": "Create a new user in the system",
    "input_schema": {
      "type": "object",
      "properties": {
        "email": { "type": "string", "format": "email" },
        "role": { "type": "string", "enum": ["viewer","editor","admin"] },
        "first_name": { "type": "string" },
        "last_name": { "type": "string" }
      },
      "required": ["email", "role"]
    },
    "safety": { "risk_level": "medium", "idempotent": false }
  },
  {
    "tool_name": "user_delete",
    "description": "Delete (deactivate) a user from the system",
    "input_schema": {
      "type": "object",
      "properties": { "user_id": { "type": "string" } },
      "required": ["user_id"]
    },
    "safety": { "risk_level": "high", "confirmation_required": true, "idempotent": true }
  }
]
```

## Constraints & Safety Notes
- All operations scoped to tenant — no cross-tenant access
- Delete is "soft delete" (deactivation), hence idempotent
- Create requires `user_admin` role
- Delete requires confirmation and invalidates active sessions
- List supports flexible filtering via a generic `filters` object
