---
id: namespacing
title: Namespacing
sidebar_label: Namespacing
slug: /specification/namespacing
---
# Namespacing

Organizations MAY extend the AXAG vocabulary with custom attributes using namespaced prefixes.

## Rules
- Custom attributes MUST use the format `axag-x-{namespace}-{attribute}`
- The `x-` prefix indicates an extension attribute
- Extensions MUST NOT conflict with reserved AXAG attribute names
- Extensions SHOULD be documented in the organization's AXAG governance policy

## Example
```html
<button
  axag-intent="order.create"
  axag-entity="order"
  axag-action-type="create"
  axag-x-acme-billing-code="SALES-001"
  axag-x-acme-department="sales"
>Create Order</button>
```
