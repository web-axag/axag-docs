---
id: cross-domain-example
title: "Tutorial: Cross-Domain Agent Workflow"
sidebar_label: Cross-Domain Example
slug: /tutorials/cross-domain-example
---

# Tutorial: Cross-Domain Agent Workflow

This tutorial demonstrates an agent performing a multi-step workflow that spans multiple AXAG-annotated domains — from CRM lead creation to marketing campaign targeting.

## Scenario

An AI agent assists a sales rep with:
1. Creating a lead in the CRM
2. Searching for similar companies in the product catalog
3. Adding the lead to a marketing audience segment
4. Scheduling a follow-up campaign

## Step 1: Create a Lead (CRM Domain)

```typescript title="Step 1 — Create Lead (CRM domain)"
// Agent calls the CRM tool
const lead = await mcpClient.callTool("lead_create", {
  first_name: "Jane",
  last_name: "Smith",
  email: "jane.smith@acme.com",
  company: "Acme Corp",
  source: "referral",
});
// Returns: { lead_id: "lead_abc123", status: "created" }
```

## Step 2: Search for Similar Companies (E-Commerce Domain)

```typescript title="Step 2 — Product Search (E-Commerce domain)"
// Agent uses product search to find relevant products for this lead's industry
const products = await mcpClient.callTool("product_search", {
  query: "enterprise software",
  category: "B2B",
  sort_by: "relevance",
});
```

## Step 3: Add to Audience Segment (Marketing Domain)

```typescript title="Step 3 — Create Audience Segment (Marketing domain)"
// Agent adds the lead to a targeted segment
const segment = await mcpClient.callTool("audience_create_segment", {
  name: "Enterprise Referrals Q1",
  rules: {
    operator: "AND",
    conditions: [
      { field: "source", operator: "equals", value: "referral" },
      { field: "company_size", operator: "gt", value: 100 },
    ],
  },
});
```

## Step 4: Schedule Campaign (Marketing Domain)

```typescript title="Step 4 — Schedule Campaign ⚠️ requires confirmation" showLineNumbers
// This requires confirmation due to high risk
const campaign = await mcpClient.callTool("campaign_create", {
  name: "Enterprise Referral Welcome",
  channel: "email",
  audience_segment_id: segment.segment_id,
  budget: { amount: 500, currency: "USD" },
});

// Schedule — requires user confirmation
const confirmation = await promptUser(
  "Schedule campaign 'Enterprise Referral Welcome' to send tomorrow at 9 AM EST?"
);

if (confirmation) {
  await mcpClient.callTool("campaign_schedule", {
    campaign_id: campaign.campaign_id,
    send_at: "2024-02-15T09:00:00-05:00",
    timezone: "America/New_York",
  });
}
```

## Safety Gates in Action

Notice how the AXAG safety metadata guided the agent:

| Step | Tool | Risk | Confirmation | Why |
|------|------|------|-------------|-----|
| 1 | `lead_create` | Low | No | Creating a lead is low-impact |
| 2 | `product_search` | None | No | Read-only operation |
| 3 | `audience_create_segment` | None | No | Metadata creation, no external impact |
| 4a | `campaign_create` | Low | No | Creates in draft status |
| 4b | `campaign_schedule` | High | **Yes** | Triggers message delivery |

The agent knew to ask for confirmation only at the scheduling step because the AXAG manifest declared `campaign_schedule` as high risk with `confirmation_required: true`.

## Key Takeaways

1. **Cross-domain workflows are seamless** when each domain uses AXAG
2. **Safety metadata prevents autonomous dangerous actions** — the agent paused at the right moment
3. **No scraping needed** — every step used structured tool calls
4. **Tool discovery is automatic** — the agent found tools via the manifest without hardcoding
