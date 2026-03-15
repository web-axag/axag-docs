import React from 'react';

interface ProposedPatternProps {
  children: React.ReactNode;
}

export default function ProposedPattern({ children }: ProposedPatternProps): JSX.Element {
  return (
    <div className="axag-proposed">
      <strong>🔬 Proposed Implementation Pattern</strong>
      <div style={{ marginTop: '0.5rem' }}>{children}</div>
    </div>
  );
}
