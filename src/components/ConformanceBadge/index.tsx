import React from 'react';

interface ConformanceBadgeProps {
  level: 'basic' | 'intermediate' | 'full';
}

const labels: Record<string, string> = {
  basic: 'Basic Conformance',
  intermediate: 'Intermediate Conformance',
  full: 'Full Conformance',
};

export default function ConformanceBadge({ level }: ConformanceBadgeProps): JSX.Element {
  return (
    <span className={`conformance-badge conformance-badge--${level}`}>
      {labels[level]}
    </span>
  );
}
