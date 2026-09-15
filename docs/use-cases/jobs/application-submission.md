---
id: application-submission
title: "Jobs: Application Submission"
sidebar_label: Application Submission
slug: /use-cases/jobs/application-submission
---

# Jobs: Application Submission

## Problem Statement
Submitting a job application involves attaching a resume, cover letter, answering screening questions, and providing personal details. This is a multi-part write operation with file uploads.

## Why Human-Only Semantics Fail
- Application forms vary wildly between companies (custom ATS forms)
- Screening questions are dynamically generated per job posting
- File upload controls don't declare accepted formats or size limits
- "Easy Apply" vs full application have different field requirements

## Why Scraping Fails Here
- Each ATS (Greenhouse, Lever, Workday) has completely different HTML
- File uploads require multipart form handling
- Screening questions are dynamically rendered based on the job ID
- CAPTCHA and bot detection protect application endpoints

## How AXAG Eliminates Scraping
`application.submit` declares the full parameter schema including file references, screening answers, and any required fields per posting.

## Annotated UI Example
```html title="Jobs — submit application" showLineNumbers
<button
  axag-intent="application.submit"
  axag-entity="application"
  axag-action-type="write"
  axag-required-parameters='["job_id","resume_url","first_name","last_name","email"]'
  axag-optional-parameters='["cover_letter_url","phone","linkedin_url","screening_answers","referral_source"]'
  axag-preconditions='["job listing must be active","user must not have already applied"]'
  axag-postconditions='["application submitted","confirmation email sent"]'
  axag-risk-level="medium"
  axag-confirmation-required="true"
  axag-idempotent="false"
  axag-description="Submit a job application"
>Submit Application</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — application.submit" showLineNumbers
{
  "intent": "application.submit",
  "entity": "application",
  "action_type": "write",
  "operation_id": "application_submit",
  "description": "Submit a job application",
  "required_parameters": [
    { "name": "job_id", "type": "string" },
    { "name": "resume_url", "type": "string", "format": "url" },
    { "name": "first_name", "type": "string" },
    { "name": "last_name", "type": "string" },
    { "name": "email", "type": "string", "format": "email" }
  ],
  "optional_parameters": [
    { "name": "cover_letter_url", "type": "string", "format": "url" },
    { "name": "phone", "type": "string" },
    { "name": "linkedin_url", "type": "string", "format": "url" },
    {
      "name": "screening_answers",
      "type": "array",
      "items": {
        "type": "object",
        "properties": { "question_id": { "type": "string" }, "answer": { "type": "string" } }
      }
    },
    { "name": "referral_source", "type": "string" }
  ],
  "risk_level": "medium",
  "confirmation_required": true,
  "idempotent": false,
  "preconditions": ["job listing must be active", "user must not have already applied"],
  "postconditions": ["application submitted", "confirmation email sent"]
}
```

## Generated Tool Example
```json
{
  "name": "application_submit",
  "description": "Submit a job application",
  "input_schema": {
    "type": "object",
    "properties": {
      "job_id": { "type": "string" },
      "resume_url": { "type": "string", "format": "uri" },
      "first_name": { "type": "string" },
      "last_name": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "cover_letter_url": { "type": "string", "format": "uri" },
      "phone": { "type": "string" },
      "linkedin_url": { "type": "string", "format": "uri" },
      "screening_answers": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": { "question_id": { "type": "string" }, "answer": { "type": "string" } },
          "required": ["question_id", "answer"]
        }
      }
    },
    "required": ["job_id", "resume_url", "first_name", "last_name", "email"]
  },
  "metadata": {
    "action_type": "write",
    "risk_level": "medium",
    "idempotent": false,
    "confirmation_required": true,
    "approval_required": false,
    "source_intent": "application.submit",
    "source_entity": "application"
  }
}
```

## Constraints & Safety Notes
- **Confirmation required**: submitting an application is a significant action
- **Not idempotent**: duplicate submissions may create duplicate applications
- Precondition prevents duplicate applications for the same job
- `resume_url` and `cover_letter_url` reference pre-uploaded files
- Screening answers must match the questions defined for the specific job listing
