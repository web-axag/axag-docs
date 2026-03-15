---
id: annotating-buttons
title: Annotating Buttons and Action Controls
sidebar_label: Buttons & Actions
slug: /authoring-guide/annotating-buttons
---
# Annotating Buttons and Action Controls

Buttons are the most common interactive elements requiring AXAG annotations. Every button that triggers an operation SHOULD carry semantic annotations.

## Basic Button Annotation
```html title="Read operation button"
<button
  <!-- axag-highlight-start -->
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  <!-- axag-highlight-end -->
  axag-required-parameters='["query"]'
  axag-scope="catalog"
  axag-risk-level="none"
  axag-description="Search the product catalog"
>
  Search
</button>
```

## Destructive Button
```html title="High-risk destructive action"
<button
  axag-intent="order.cancel"
  axag-entity="order"
  axag-action-type="mutate"
  axag-required-parameters='["order_id"]'
  axag-scope="customer"
  <!-- axag-highlight-start -->
  axag-risk-level="high"
  axag-confirmation-required="true"
  axag-confirmation-message="This will cancel the order. Refund may take 3-5 business days."
  axag-side-effects='["refund_initiated","inventory_released"]'
  <!-- axag-highlight-end -->
>
  Cancel Order
</button>
```

## Icon Buttons
Icon buttons without text labels are especially important to annotate, as agents cannot infer intent from icons:
```html title="Icon-only button — annotation is critical"
<button
  aria-label="Delete item"
  <!-- axag-highlight-start -->
  axag-intent="cart.remove_item"
  axag-entity="cart_item"
  axag-action-type="delete"
  <!-- axag-highlight-end -->
  axag-required-parameters='["item_id"]'
  axag-risk-level="low"
>
  🗑️
</button>
```

## Toggle Buttons
```html title="Idempotent toggle"
<button
  axag-intent="notification.toggle"
  axag-entity="notification_preference"
  axag-action-type="mutate"
  axag-required-parameters='["notification_type","enabled"]'
  axag-scope="user"
  axag-risk-level="low"
  axag-idempotent="true"
>
  Enable Notifications
</button>
```

## Common Mistakes
- Annotating decorative buttons that don't trigger operations
- Using `axag-action-type="mutate"` for buttons that only navigate
- Forgetting to annotate icon-only buttons
- Not declaring side effects on buttons that trigger background processes
