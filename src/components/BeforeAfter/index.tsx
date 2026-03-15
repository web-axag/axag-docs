import React from 'react';

interface BeforeAfterProps {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfter({
  before,
  after,
  beforeLabel = '❌ Before (Anti-Pattern)',
  afterLabel = '✅ After (AXAG)',
}: BeforeAfterProps): JSX.Element {
  return (
    <div className="comparison-container">
      <div className="comparison-before">
        <div className="comparison-label">{beforeLabel}</div>
        {before}
      </div>
      <div className="comparison-after">
        <div className="comparison-label">{afterLabel}</div>
        {after}
      </div>
    </div>
  );
}
