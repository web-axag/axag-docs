---
id: annotating-embedded-widgets
title: Annotating Embedded Widgets
sidebar_label: Embedded Widgets
slug: /authoring-guide/annotating-embedded-widgets
---
# Annotating Embedded Widgets

Third-party widgets (payment forms, maps, calendars) embedded in your application should be annotated at the container level.

```html title="Third-party widget — Stripe payment" showLineNumbers
<div
  axag-intent="payment.collect"
  axag-entity="payment"
  axag-action-type="mutate"
  axag-required-parameters='["amount","currency","payment_method"]'
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-scope="customer"
  axag-widget-type="third-party"
  axag-widget-provider="stripe"
>
  <!-- Stripe Elements iframe renders here -->
</div>
```

The container annotation describes the semantic operation even though the internal widget implementation is opaque.
