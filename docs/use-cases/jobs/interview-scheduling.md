---
id: interview-scheduling
title: "Jobs: Interview Scheduling"
sidebar_label: Interview Scheduling
slug: /use-cases/jobs/interview-scheduling
---

# Jobs: Interview Scheduling

## Problem Statement
Scheduling interviews requires coordinating availability between candidates and interviewers, selecting time slots, choosing interview format (video/phone/in-person), and sending calendar invitations.

## Why Human-Only Semantics Fail
- Calendar availability grids are visual components
- Time slot selection uses click-based interaction
- Interview format options don't declare their requirements (e.g., video link generation)
- "Confirm" sends calendar invites as a side-effect

## Why Scraping Fails Here
- Calendar components render as complex grid layouts
- Available slots are fetched dynamically via API
- Timezone handling varies between components
- Calendar invitations are sent server-side (iCal/Google Calendar API)

## How AXAG Eliminates Scraping
`interview.schedule` declares slot selection, format choice, and the side-effects of confirmation (calendar invite, notification).

## Annotated UI Example
```html title="Jobs — schedule interview" showLineNumbers
<button
  axag-intent="interview.schedule"
  axag-entity="interview"
  axag-action-type="write"
  axag-required-parameters='["application_id","slot_id","format"]'
  axag-optional-parameters='["interviewer_notes","candidate_timezone"]'
  axag-preconditions='["application must be in interview stage","slot must be available"]'
  axag-postconditions='["interview scheduled","calendar invites sent to all participants"]'
  axag-risk-level="medium"
  axag-confirmation-required="true"
  axag-idempotent="true"
  axag-side-effects='["calendar_invite","email_notification"]'
  axag-description="Schedule an interview for a job application"
>Confirm Interview</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — interview.schedule" showLineNumbers
{
  "intent": "interview.schedule",
  "entity": "interview",
  "operation_id": "interview_schedule",
  "action_type": "write",
  "parameters": {
    "application_id": { "type": "string", "required": true },
    "slot_id": { "type": "string", "required": true },
    "format": {
      "type": "string",
      "required": true,
      "enum": ["video","phone","in_person"]
    },
    "interviewer_notes": { "type": "string", "required": false },
    "candidate_timezone": { "type": "string", "required": false }
  },
  "preconditions": [
    "application must be in interview stage",
    "slot must be available"
  ],
  "postconditions": [
    "interview scheduled",
    "calendar invites sent to all participants"
  ],
  "risk_level": "medium",
  "confirmation_required": true,
  "idempotent": true,
  "side_effects": ["calendar_invite", "email_notification"]
}
```

## Generated Tool Example
```json title="Tool — interview_schedule"
{
  "tool_name": "interview_schedule",
  "description": "Schedule an interview for a job application",
  "input_schema": {
    "type": "object",
    "properties": {
      "application_id": { "type": "string" },
      "slot_id": { "type": "string" },
      "format": { "type": "string", "enum": ["video","phone","in_person"] },
      "interviewer_notes": { "type": "string" },
      "candidate_timezone": { "type": "string" }
    },
    "required": ["application_id", "slot_id", "format"]
  },
  "safety": {
    "risk_level": "medium",
    "confirmation_required": true,
    "idempotent": true,
    "side_effects": ["calendar_invite", "email_notification"]
  }
}
```

## Constraints & Safety Notes
- **Confirmation required**: scheduling sends calendar invites to external participants
- **Idempotent**: re-scheduling to the same slot is a no-op
- Side-effects include external notifications (can't be silently tested)
- `video` format auto-generates a meeting link as part of the postcondition
- Candidate timezone is used to display correct times in the invite
