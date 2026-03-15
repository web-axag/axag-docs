---
id: annotating-links
title: Annotating Links and Navigation
sidebar_label: Links & Navigation
slug: /authoring-guide/annotating-links
---
# Annotating Links and Navigation Actions

Links that perform navigation SHOULD be annotated with `axag-action-type="navigate"`.

```html title="Navigation link — view product"
<a
  href="/products/123"
  axag-intent="product.view"
  axag-entity="product"
  axag-action-type="navigate"
  axag-required-parameters='["product_id"]'
  axag-scope="catalog"
  axag-risk-level="none"
>
  View Product Details
</a>
```

Links that trigger operations (e.g., "Download Report") should use the appropriate action type:
```html title="Action link — download report"
<a
  href="/api/reports/123/download"
  axag-intent="report.download"
  axag-entity="report"
  axag-action-type="read"
  axag-required-parameters='["report_id"]'
  axag-scope="user"
  axag-risk-level="none"
>
  Download Report
</a>
```
