---
id: admin-guarded-actions
title: "Enterprise: Admin-Guarded Actions"
sidebar_label: Admin-Guarded Actions
slug: /use-cases/enterprise/admin-guarded-actions
---

# Enterprise: Admin-Guarded Actions

## Problem Statement
Certain enterprise operations (changing billing plans, modifying security settings, enabling integrations) require administrative privileges. These actions must declare their permission requirements so agents don't attempt unauthorized operations.

## Why Human-Only Semantics Fail
- Admin-only buttons look identical to regular buttons
- Permission requirements are enforced server-side with no client-side declaration
- Role hierarchies (viewer < editor < admin < super-admin) aren't in the DOM
- Failed permission checks return generic "Forbidden" errors

## Why Scraping Fails Here
- Admin UI sections may be entirely absent from non-admin DOM
- Permission checks happen via API, not DOM visibility
- Multi-factor authentication gates are JavaScript-driven
- Admin panels often have different URL structures

## How AXAG Eliminates Scraping
Admin-guarded actions declare `axag-required-roles` and `axag-preconditions` with specific permission requirements. Agents check role compatibility before attempting the action.

## Annotated UI Example
```html
<!-- Change Billing Plan -->
<button
  axag-intent="billing.change_plan"
  axag-entity="billing"
  axag-action-type="write"
  axag-required-parameters='["plan_id"]'
  axag-optional-parameters='["billing_cycle","promo_code"]'
  axag-preconditions='["caller must have billing_admin role","account must not have past-due invoices"]'
  axag-postconditions='["plan changed","prorated charges applied","confirmation email sent"]'
  axag-risk-level="critical"
  axag-confirmation-required="true"
  axag-approval-required="true"
  axag-approval-roles='["super_admin"]'
  axag-idempotent="true"
  axag-side-effects='["billing_change","proration","email_notification"]'
  axag-scope="tenant"
  axag-description="Change the organization's billing plan"
>Change Plan</button>

<!-- Disable MFA (Security Setting) -->
<button
  axag-intent="security.disable_mfa"
  axag-entity="security_settings"
  axag-action-type="write"
  axag-required-parameters='["user_id"]'
  axag-preconditions='["caller must have security_admin role","MFA must be currently enabled"]'
  axag-postconditions='["MFA disabled for user","security audit log updated"]'
  axag-risk-level="critical"
  axag-confirmation-required="true"
  axag-approval-required="true"
  axag-approval-roles='["security_admin","super_admin"]'
  axag-idempotent="true"
  axag-side-effects='["security_posture_change","audit_log"]'
  axag-scope="tenant"
  axag-description="Disable multi-factor authentication for a user"
>Disable MFA</button>
```

## Semantic Manifest Excerpt
```json
{
  "intent": "billing.change_plan",
  "entity": "billing",
  "operation_id": "billing_change_plan",
  "action_type": "write",
  "parameters": {
    "plan_id": { "type": "string", "required": true },
    "billing_cycle": { "type": "string", "required": false, "enum": ["monthly","annual"] },
    "promo_code": { "type": "string", "required": false }
  },
  "preconditions": [
    "caller must have billing_admin role",
    "account must not have past-due invoices"
  ],
  "postconditions": [
    "plan changed",
    "prorated charges applied",
    "confirmation email sent"
  ],
  "risk_level": "critical",
  "confirmation_required": true,
  "approval_required": true,
  "approval_roles": ["super_admin"],
  "idempotent": true,
  "side_effects": ["billing_change", "proration", "email_notification"],
  "scope": "tenant"
}
```

## Constraints & Safety Notes
- **Critical risk**: billing changes have immediate financial impact
- **Dual gate**: requires both confirmation AND approval from a super_admin
- Agents MUST check preconditions before attempting: verify role, verify no past-due invoices
- Disabling MFA is a security-sensitive operation that logs to audit trail
- Both actions are idempotent (changing to the same plan, disabling already-disabled MFA)
- `approval_roles` declares WHO can approve, not just that approval is needed
