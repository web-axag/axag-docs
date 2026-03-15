---
id: multi-step-approval
title: "Enterprise: Multi-Step Approval"
sidebar_label: Multi-Step Approval
slug: /use-cases/enterprise/multi-step-approval
---

# Enterprise: Multi-Step Approval

## Problem Statement
Enterprise workflows often require sequential approvals from multiple stakeholders (e.g., purchase requisition → manager → finance → procurement). Agents need to understand the approval chain, current status, and their role in the flow.

## Why Human-Only Semantics Fail
- Approval workflows are displayed as visual timelines or Kanban boards
- "Approve" buttons don't declare which step they advance to
- The complete approval chain is not visible from a single view
- Conditional branching (amount > $10K → needs VP approval) is business logic, not UI

## Why Scraping Fails Here
- Workflow state is server-managed, not in the DOM
- Approval history is in collapsible panels
- The next approver is determined by business rules
- Email-based approvals happen outside the web UI entirely

## How AXAG Eliminates Scraping
`approval.submit`, `approval.approve`, and `approval.reject` are distinct intents with declared chain position, required fields per step, and role requirements.

## Annotated UI Example
```html title="Enterprise — submit / approve / reject workflow" showLineNumbers
<!-- Submit for Approval -->
<button
  axag-intent="approval.submit"
  axag-entity="purchase_requisition"
  axag-action-type="write"
  axag-required-parameters='["requisition_id"]'
  axag-optional-parameters='["justification","urgency"]'
  axag-preconditions='["requisition must be in draft status","all required fields must be populated"]'
  axag-postconditions='["requisition submitted for approval","first approver notified"]'
  axag-risk-level="medium"
  axag-confirmation-required="true"
  axag-idempotent="true"
  axag-side-effects='["email_notification_to_approver"]'
  axag-description="Submit a purchase requisition for approval"
>Submit for Approval</button>

<!-- Approve -->
<button
  axag-intent="approval.approve"
  axag-entity="purchase_requisition"
  axag-action-type="write"
  axag-required-parameters='["requisition_id","approval_step_id"]'
  axag-optional-parameters='["comments","conditions"]'
  axag-preconditions='["caller must be the designated approver for current step","requisition must be pending at this step"]'
  axag-postconditions='["step approved","next approver notified or workflow complete"]'
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-idempotent="true"
  axag-side-effects='["workflow_advancement","notification"]'
  axag-description="Approve a purchase requisition at the current approval step"
>Approve</button>

<!-- Reject -->
<button
  axag-intent="approval.reject"
  axag-entity="purchase_requisition"
  axag-action-type="write"
  axag-required-parameters='["requisition_id","approval_step_id","reason"]'
  axag-preconditions='["caller must be the designated approver for current step"]'
  axag-postconditions='["requisition rejected","submitter notified"]'
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-idempotent="true"
  axag-side-effects='["workflow_termination","notification"]'
  axag-description="Reject a purchase requisition at the current approval step"
>Reject</button>
```

## Approval Chain Schema
```json title="Approval chain schema"
{
  "approval_chain": [
    { "step": 1, "role": "manager", "condition": "always" },
    { "step": 2, "role": "finance", "condition": "amount > 1000" },
    { "step": 3, "role": "vp", "condition": "amount > 10000" },
    { "step": 4, "role": "procurement", "condition": "always" }
  ]
}
```

## Generated Tool Examples
```json title="Tools — submit / approve / reject" showLineNumbers
[
  {
    "tool_name": "approval_submit",
    "description": "Submit a purchase requisition for approval",
    "input_schema": {
      "type": "object",
      "properties": {
        "requisition_id": { "type": "string" },
        "justification": { "type": "string" },
        "urgency": { "type": "string", "enum": ["normal","high","critical"] }
      },
      "required": ["requisition_id"]
    },
    "safety": { "risk_level": "medium", "confirmation_required": true, "idempotent": true }
  },
  {
    "tool_name": "approval_approve",
    "description": "Approve a purchase requisition at the current step",
    "input_schema": {
      "type": "object",
      "properties": {
        "requisition_id": { "type": "string" },
        "approval_step_id": { "type": "string" },
        "comments": { "type": "string" },
        "conditions": { "type": "string" }
      },
      "required": ["requisition_id", "approval_step_id"]
    },
    "safety": { "risk_level": "high", "confirmation_required": true, "idempotent": true }
  },
  {
    "tool_name": "approval_reject",
    "description": "Reject a purchase requisition at the current step",
    "input_schema": {
      "type": "object",
      "properties": {
        "requisition_id": { "type": "string" },
        "approval_step_id": { "type": "string" },
        "reason": { "type": "string" }
      },
      "required": ["requisition_id", "approval_step_id", "reason"]
    },
    "safety": { "risk_level": "high", "confirmation_required": true, "idempotent": true }
  }
]
```

## Constraints & Safety Notes
- All approval operations are **idempotent**: approving an already-approved step is a no-op
- **Role-gated**: only the designated approver for the current step can approve/reject
- Conditional steps (amount thresholds) are evaluated server-side
- Rejection terminates the workflow and notifies the submitter
- Approval with `conditions` creates a conditional approval that may require follow-up
