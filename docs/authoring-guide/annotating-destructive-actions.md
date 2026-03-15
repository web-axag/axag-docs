---
id: annotating-destructive-actions
title: Annotating Destructive Actions
sidebar_label: Destructive Actions
slug: /authoring-guide/annotating-destructive-actions
---
# Annotating Destructive Actions

Destructive actions (delete, purge, revoke) require explicit safety annotations.

```html title="🔴 Critical destructive action — account deletion" showLineNumbers
<button
  axag-intent="account.delete"
  axag-entity="account"
  axag-action-type="delete"
  axag-required-parameters='["account_id","confirmation_code"]'
  axag-risk-level="critical"
  axag-confirmation-required="true"
  axag-confirmation-message="This will permanently delete the account and all data. This cannot be undone."
  axag-idempotent="false"
  axag-side-effects='["data_purged","subscriptions_cancelled","api_keys_revoked"]'
  axag-scope="user"
>Delete Account</button>
```

Rules:
- `delete` actions MUST declare `axag-risk-level` of `medium` or higher
- `critical` risk actions MUST have `axag-confirmation-required="true"`
- Irreversible actions SHOULD declare `axag-idempotent="false"`
- All side effects MUST be declared
