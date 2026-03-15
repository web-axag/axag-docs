---
id: annotating-approval-gates
title: Annotating Approval Gates
sidebar_label: Approval Gates
slug: /authoring-guide/annotating-approval-gates
---
# Annotating Approval Gates

Operations requiring multi-party approval need explicit approval annotations.

```html title="Approval gate — refund processing" showLineNumbers
<button
  axag-intent="refund.process"
  axag-entity="refund"
  axag-action-type="create"
  axag-required-parameters='["order_id","amount","reason"]'
  axag-risk-level="high"
  axag-approval-required="true"
  axag-approval-roles='["finance_manager"]'
  axag-approval-count="1"
  axag-scope="organization"
>Process Refund</button>
```

The agent runtime will submit an approval request rather than executing directly, then wait for the required number of approvals from authorized roles.
