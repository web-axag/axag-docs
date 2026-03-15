---
id: confirmation-requirements
title: Confirmation Requirements
sidebar_label: Confirmation Requirements
slug: /specification/confirmation-requirements
---
# Confirmation Requirements

Confirmation requirements gate operation execution behind explicit user or agent acknowledgment.

## When Confirmation Is Required
- `risk_level` is `high` or `critical`
- The operation produces irreversible side effects
- Financial transactions exceed defined thresholds

## Declaration
```html
<button
  axag-intent="order.cancel"
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-confirmation-message="This will cancel order #{{order_id}} and initiate a refund. This cannot be undone."
>Cancel Order</button>
```

## Agent Runtime Behavior
When `axag-confirmation-required="true"`, agent runtimes MUST:
1. Present the confirmation message to the user
2. Wait for explicit confirmation
3. Only proceed upon affirmative response
4. Log the confirmation event
