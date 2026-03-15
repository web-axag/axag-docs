---
id: annotating-async-operations
title: Annotating Async Operations
sidebar_label: Async Operations
slug: /authoring-guide/annotating-async-operations
---
# Annotating Async Operations

Asynchronous operations produce results after a delay. Annotate them with postconditions and polling hints.

```html title="Async operation — report generation" showLineNumbers
<button
  axag-intent="report.generate"
  axag-entity="report"
  axag-action-type="create"
  axag-required-parameters='["report_type","date_range"]'
  axag-risk-level="none"
  axag-async="true"
  axag-async-polling-endpoint="/api/reports/{report_id}/status"
  axag-async-estimated-duration="30s"
  axag-postconditions='["report_ready"]'
>Generate Report</button>
```

The agent runtime should poll the status endpoint rather than blocking on the initial invocation.
