import React from 'react';

interface NormativeCalloutProps {
  level?: 'MUST' | 'SHOULD' | 'MAY' | 'MUST NOT' | 'SHOULD NOT';
  children: React.ReactNode;
}

export default function NormativeCallout({
  level = 'MUST',
  children,
}: NormativeCalloutProps): JSX.Element {
  return (
    <div className="axag-normative">
      <strong>📋 Normative — {level}</strong>
      <div style={{ marginTop: '0.5rem' }}>{children}</div>
    </div>
  );
}
