---
id: context-inheritance
title: Context Inheritance
sidebar_label: Context Inheritance
slug: /specification/context-inheritance
---
# Context Inheritance

AXAG supports context inheritance — child elements inherit scope, tenant, and role context from parent containers.

## Inheritance Rules
1. `axag-scope` on a parent element applies to all child annotations
2. `axag-tenant-context` on a parent element applies to all children
3. `axag-required-roles` on a parent element constrains all children
4. Child elements MAY override inherited context with more restrictive values
5. Child elements MUST NOT override inherited context with less restrictive values

## Example
```html
<section axag-scope="tenant" axag-tenant-context="acme-corp" axag-required-roles='["admin"]'>
  <!-- Both buttons inherit scope="tenant", tenant-context="acme-corp", required-roles=["admin"] -->
  <button axag-intent="user.create" axag-entity="user" axag-action-type="create">Add User</button>
  <button axag-intent="user.delete" axag-entity="user" axag-action-type="delete"
    axag-required-roles='["super_admin"]'>Delete User</button>
  <!-- Delete overrides to require super_admin (more restrictive) — valid -->
</section>
```
