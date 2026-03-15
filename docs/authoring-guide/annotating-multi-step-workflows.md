---
id: annotating-multi-step-workflows
title: Annotating Multi-Step Workflows
sidebar_label: Multi-Step Workflows
slug: /authoring-guide/annotating-multi-step-workflows
---
# Annotating Multi-Step Workflows

Multi-step workflows use workflow attributes to declare step position and flow.

```html title="4-step checkout workflow" showLineNumbers
<div axag-workflow-id="checkout" axag-workflow-total-steps="4">
  <section axag-workflow-step="1" axag-workflow-next="checkout.select_shipping">
    <button axag-intent="checkout.review_cart" axag-entity="cart" axag-action-type="read">Review Cart</button>
  </section>
  <section axag-workflow-step="2" axag-workflow-next="checkout.enter_payment"
    axag-workflow-previous="checkout.review_cart">
    <button axag-intent="checkout.select_shipping" axag-entity="shipping" axag-action-type="mutate"
      axag-required-parameters='["shipping_method"]'>Select Shipping</button>
  </section>
  <section axag-workflow-step="3" axag-workflow-next="checkout.confirm"
    axag-workflow-previous="checkout.select_shipping">
    <button axag-intent="checkout.enter_payment" axag-entity="payment" axag-action-type="mutate"
      axag-required-parameters='["payment_method_id"]' axag-risk-level="high">Enter Payment</button>
  </section>
  <section axag-workflow-step="4" axag-workflow-previous="checkout.enter_payment">
    <button axag-intent="checkout.confirm" axag-entity="order" axag-action-type="create"
      axag-risk-level="high" axag-confirmation-required="true">Place Order</button>
  </section>
</div>
```
