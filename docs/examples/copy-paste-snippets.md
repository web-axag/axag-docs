---
id: copy-paste-snippets
title: Copy-Paste Snippets
sidebar_label: Copy-Paste Snippets
slug: /examples/copy-paste-snippets
---

# Copy-Paste Snippets

Ready-to-use annotation templates for common UI patterns. Copy, paste, and customize.

## Read Operations

### Search
```html title="🔍 Search Operation Template"
<button
  <!-- axag-highlight-start -->
  axag-intent="ENTITY.search"
  axag-entity="ENTITY"
  axag-action-type="read"
  <!-- axag-highlight-end -->
  axag-required-parameters='["query"]'
  axag-optional-parameters='["category","sort_by","page","page_size"]'
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Search ENTITY_PLURAL"
>Search</button>
```

### List
```html title="📋 List Operation Template"
<button
  <!-- axag-highlight-start -->
  axag-intent="ENTITY.list"
  axag-entity="ENTITY"
  axag-action-type="read"
  <!-- axag-highlight-end -->
  axag-optional-parameters='["status","page","page_size","sort_by"]'
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="List all ENTITY_PLURAL"
>View All</button>
```

### Get Details
```html title="🔎 Get Details Template"
<button
  <!-- axag-highlight-start -->
  axag-intent="ENTITY.get"
  axag-entity="ENTITY"
  axag-action-type="read"
  <!-- axag-highlight-end -->
  axag-required-parameters='["ENTITY_id"]'
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Get details of a specific ENTITY"
>View Details</button>
```

## Write Operations

### Create
```html title="➕ Create Operation Template"
<button
  axag-intent="ENTITY.create"
  axag-entity="ENTITY"
  axag-action-type="write"
  axag-required-parameters='["REQUIRED_FIELDS"]'
  axag-optional-parameters='["OPTIONAL_FIELDS"]'
  axag-risk-level="low"
  axag-idempotent="false"
  axag-side-effects='["SIDE_EFFECTS"]'
  axag-description="Create a new ENTITY"
>Create</button>
```

### Update
```html title="✏️ Update Operation Template"
<button
  axag-intent="ENTITY.update"
  axag-entity="ENTITY"
  axag-action-type="write"
  axag-required-parameters='["ENTITY_id"]'
  axag-optional-parameters='["UPDATABLE_FIELDS"]'
  axag-risk-level="medium"
  axag-idempotent="true"
  axag-confirmation-required="true"
  axag-description="Update an existing ENTITY"
>Save Changes</button>
```

## Delete Operations

### Soft Delete
```html title="🗑️ Soft Delete Template"
<button
  axag-intent="ENTITY.delete"
  axag-entity="ENTITY"
  axag-action-type="delete"
  axag-required-parameters='["ENTITY_id"]'
  axag-preconditions='["PRECONDITIONS"]'
  axag-postconditions='["ENTITY deactivated"]'
  <!-- axag-highlight-start -->
  axag-risk-level="high"
  axag-confirmation-required="true"
  <!-- axag-highlight-end -->
  axag-idempotent="true"
  axag-description="Delete (deactivate) a ENTITY"
>Delete</button>
```

### Hard Delete (Critical)
```html title="⚠️ Hard Delete Template — Critical Risk"
<button
  axag-intent="ENTITY.delete_permanent"
  axag-entity="ENTITY"
  axag-action-type="delete"
  axag-required-parameters='["ENTITY_id"]'
  axag-preconditions='["no dependent records"]'
  axag-postconditions='["ENTITY permanently removed"]'
  <!-- axag-highlight-start -->
  axag-risk-level="critical"
  axag-confirmation-required="true"
  axag-approval-required="true"
  axag-approval-roles='["admin"]'
  <!-- axag-highlight-end -->
  axag-idempotent="true"
  axag-description="Permanently delete a ENTITY"
>Permanently Delete</button>
```

## Approval Operations

### Submit for Approval
```html title="✅ Approval Workflow Template"
<button
  axag-intent="ENTITY.submit_for_approval"
  axag-entity="ENTITY"
  axag-action-type="write"
  axag-required-parameters='["ENTITY_id"]'
  axag-preconditions='["ENTITY must be in draft status"]'
  axag-postconditions='["ENTITY submitted","approver notified"]'
  axag-risk-level="medium"
  axag-confirmation-required="true"
  axag-idempotent="true"
  axag-side-effects='["notification"]'
  axag-description="Submit ENTITY for approval"
>Submit for Approval</button>
```

## Async Operations

### Export
```html title="📤 Async Export Template"
<button
  axag-intent="ENTITY.export"
  axag-entity="ENTITY"
  axag-action-type="read"
  axag-required-parameters='["ENTITY_id"]'
  axag-optional-parameters='["format","columns"]'
  axag-risk-level="none"
  axag-idempotent="false"
  axag-async="true"
  axag-scope="tenant"
  axag-description="Export ENTITY data as a downloadable file"
>Export</button>
```

## How to Use These Templates

1. Copy the snippet
2. Replace `ENTITY` with your domain entity name (e.g., `product`, `user`, `ticket`)
3. Replace `ENTITY_PLURAL` with the plural form (e.g., `products`, `users`, `tickets`)
4. Replace `REQUIRED_FIELDS`, `OPTIONAL_FIELDS`, etc. with actual field names
5. Adjust risk levels and safety metadata based on your domain
6. Run `npx axag-lint` to validate
