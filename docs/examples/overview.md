---
id: overview
title: Examples Overview
sidebar_label: Overview
slug: /examples/overview
---

# Examples Overview

This section provides practical, copy-paste-ready examples of AXAG annotations, manifests, and generated tools across various patterns.

## What's in This Section

| Page | Description |
|------|-------------|
| [Before & After](/docs/examples/before-and-after) | Side-by-side comparison of un-annotated vs. AXAG-annotated UI |
| [Anti-Patterns](/docs/examples/anti-patterns) | Common mistakes and how to avoid them |
| [Copy-Paste Snippets](/docs/examples/copy-paste-snippets) | Ready-to-use annotation templates |
| [Domain Gallery](/docs/examples/domain-gallery) | Complete annotation sets for common domains |

## Quick Start Examples

### Minimal Read Action
```html
<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-required-parameters='["query"]'
  axag-description="Search products"
>Search</button>
```

### Minimal Write Action
```html
<button
  axag-intent="lead.create"
  axag-entity="lead"
  axag-action-type="write"
  axag-required-parameters='["email","name"]'
  axag-risk-level="low"
  axag-idempotent="false"
  axag-description="Create a new lead"
>Create Lead</button>
```

### Full Safety-Annotated Action
```html
<button
  axag-intent="account.delete"
  axag-entity="account"
  axag-action-type="delete"
  axag-required-parameters='["account_id"]'
  axag-preconditions='["user must confirm deletion","no pending transactions"]'
  axag-postconditions='["account deactivated","data scheduled for deletion in 30 days"]'
  axag-risk-level="critical"
  axag-confirmation-required="true"
  axag-approval-required="true"
  axag-approval-roles='["super_admin"]'
  axag-idempotent="true"
  axag-side-effects='["data_deletion_scheduled","session_invalidation","notification_email"]'
  axag-scope="tenant"
  axag-description="Permanently delete a user account"
>Delete Account</button>
```
