---
id: annotation-reuse
title: Annotation Reuse Through Component Libraries
sidebar_label: Annotation Reuse
slug: /authoring-guide/annotation-reuse
---
# Annotation Reuse Through Component Libraries

In React, Vue, and other component-based frameworks, create annotated wrapper components for reuse.

## React Example (TypeScript)
```tsx title="AXAGButton.tsx — reusable annotated component" showLineNumbers
interface AXAGButtonProps {
  intent: string;
  entity: string;
  actionType: 'read' | 'create' | 'mutate' | 'delete' | 'navigate';
  requiredParameters?: string[];
  riskLevel?: 'none' | 'low' | 'medium' | 'high' | 'critical';
  scope?: string;
  description?: string;
  confirmationRequired?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function AXAGButton({
  intent, entity, actionType, requiredParameters = [],
  riskLevel = 'none', scope, description,
  confirmationRequired = false, children, onClick,
}: AXAGButtonProps) {
  return (
    <button
      axag-intent={intent}
      axag-entity={entity}
      axag-action-type={actionType}
      axag-required-parameters={JSON.stringify(requiredParameters)}
      axag-risk-level={riskLevel}
      axag-scope={scope}
      axag-description={description}
      axag-confirmation-required={String(confirmationRequired)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## Usage
```tsx title="Usage — consistent annotations everywhere"
<AXAGButton
  intent="product.search"
  entity="product"
  actionType="read"
  requiredParameters={["query"]}
  scope="catalog"
  description="Search the product catalog"
>
  Search
</AXAGButton>
```

This pattern ensures consistency across the application and reduces annotation duplication.
