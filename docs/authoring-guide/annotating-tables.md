---
id: annotating-tables
title: Annotating Tables and Bulk Actions
sidebar_label: Tables & Bulk Actions
slug: /authoring-guide/annotating-tables
---
# Annotating Tables and Bulk Actions

Tables with row-level and bulk actions require annotations on action controls within table contexts.

## Row Action
```html title="Row-level actions — view & cancel" showLineNumbers
<table axag-entity="order" axag-scope="customer">
  <tr>
    <td>Order #1234</td>
    <td>
      <button axag-intent="order.view" axag-action-type="navigate" axag-required-parameters='["order_id"]'>View</button>
      <button axag-intent="order.cancel" axag-action-type="mutate" axag-risk-level="high"
        axag-confirmation-required="true" axag-required-parameters='["order_id"]'>Cancel</button>
    </td>
  </tr>
</table>
```

## Bulk Action
```html title="Bulk action — export selected"
<button
  axag-intent="order.bulk_export"
  axag-entity="order"
  axag-action-type="read"
  axag-required-parameters='["order_ids"]'
  axag-scope="customer"
  axag-risk-level="none"
  axag-description="Export selected orders as CSV"
>Export Selected</button>
```
