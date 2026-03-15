---
id: approval-requirements
title: Approval Requirements
sidebar_label: Approval Requirements
slug: /specification/approval-requirements
---
# Approval Requirements

Approval requirements gate operations behind multi-party authorization. These are distinct from confirmations — approvals require a different person or role to authorize.

## Declaration
```html
<button
  axag-intent="refund.process"
  axag-risk-level="high"
  axag-approval-required="true"
  axag-approval-roles='["finance_manager","finance_director"]'
  axag-approval-count="1"
>Process Refund</button>
```

## Approval Model
- `axag-approval-roles` — Roles authorized to approve
- `axag-approval-count` — Number of approvals required (default: 1)
- The invoking agent/user cannot self-approve

## Agent Runtime Behavior
When `axag-approval-required="true"`, agent runtimes MUST:
1. Submit an approval request rather than executing directly
2. Notify the appropriate approval roles
3. Wait for the required number of approvals
4. Execute only after all approvals are received
