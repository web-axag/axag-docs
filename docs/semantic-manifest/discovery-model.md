---
id: discovery-model
title: Manifest Discovery Model
sidebar_label: Discovery Model
slug: /semantic-manifest/discovery-model
---
# Manifest Discovery Model

Agent runtimes discover manifests through well-known URLs or service registries.

## Discovery Mechanisms

### Well-Known URL
```
https://example.com/.well-known/axag-manifest.json
```

### HTTP Header
```
Link: </.well-known/axag-manifest.json>; rel="axag-manifest"
```

### Meta Tag
```html
<meta name="axag-manifest" content="/axag-manifest.json" />
```

### Service Registry
For microservice architectures, manifests can be registered in a central manifest registry.

## Discovery Flow
1. Agent navigates to a domain
2. Agent checks for well-known URL, HTTP header, or meta tag
3. Agent fetches the manifest
4. Agent indexes available operations
5. Agent generates or consumes tool definitions
