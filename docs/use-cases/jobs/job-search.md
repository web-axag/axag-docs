---
id: job-search
title: "Jobs: Job Search"
sidebar_label: Job Search
slug: /use-cases/jobs/job-search
---

# Jobs: Job Search

## Problem Statement
Job search involves querying listings by keywords, location, experience level, salary range, and job type. Results need structured data including company, title, salary, and requirements.

## Why Human-Only Semantics Fail
- Job search forms mix free-text with structured filters
- Location fields use autocomplete with varying granularity (city/state/remote)
- Salary ranges are displayed in varied formats ("$80K-$120K", "Competitive")
- Experience levels use non-standard labels ("Mid-Senior", "Associate", "IC3")

## Why Scraping Fails Here
- Job board HTML varies dramatically between platforms
- Many listings lazy-load job details on click
- Salary data is often hidden or shown only after interaction
- Remote/hybrid/onsite flags are represented inconsistently

## How AXAG Eliminates Scraping
`job.search` declares structured parameters with enums for job type and experience, numeric ranges for salary, and standardized location handling.

## Annotated UI Example
```html title="Jobs — search listings"
<button
  axag-intent="job.search"
  axag-entity="job_listing"
  axag-action-type="read"
  axag-required-parameters='["query"]'
  axag-optional-parameters='["location","job_type","experience_level","salary_min","salary_max","remote","posted_within_days","page"]'
  axag-scope="public"
  axag-risk-level="none"
  axag-idempotent="true"
  axag-description="Search for job listings matching criteria"
>Search Jobs</button>
```

## Semantic Manifest Excerpt
```json title="Manifest — job.search" showLineNumbers
{
  "intent": "job.search",
  "entity": "job_listing",
  "action_type": "read",
  "operation_id": "job_search",
  "description": "Search for job listings matching criteria",
  "required_parameters": [{ "name": "query", "type": "string" }],
  "optional_parameters": [
    { "name": "location", "type": "string" },
    {
      "name": "job_type",
      "type": "string",
      "enum": ["full_time", "part_time", "contract", "internship", "freelance"]
    },
    {
      "name": "experience_level",
      "type": "string",
      "enum": ["entry", "mid", "senior", "lead", "executive"]
    },
    { "name": "salary_min", "type": "number", "min": 0 },
    { "name": "salary_max", "type": "number", "min": 0 },
    { "name": "remote", "type": "boolean" },
    { "name": "posted_within_days", "type": "integer", "min": 1 },
    { "name": "page", "type": "integer", "min": 1 }
  ],
  "risk_level": "none",
  "idempotent": true,
  "scope": "public"
}
```

## Generated Tool Example
```json title="Tool — job_search"
{
  "name": "job_search",
  "description": "Search for job listings matching criteria",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string" },
      "location": { "type": "string" },
      "job_type": {
        "type": "string",
        "enum": ["full_time", "part_time", "contract", "internship", "freelance"]
      },
      "experience_level": {
        "type": "string",
        "enum": ["entry", "mid", "senior", "lead", "executive"]
      },
      "salary_min": { "type": "number", "minimum": 0 },
      "salary_max": { "type": "number", "minimum": 0 },
      "remote": { "type": "boolean" }
    },
    "required": ["query"]
  },
  "metadata": {
    "action_type": "read",
    "risk_level": "none",
    "idempotent": true,
    "confirmation_required": false,
    "approval_required": false,
    "source_intent": "job.search",
    "source_entity": "job_listing"
  }
}
```

## Constraints & Safety Notes
- Read-only, no side-effects
- Public scope — no authentication required for search
- Salary values are annual and in USD by default
- `posted_within_days` helps filter for freshness
