import React from 'react';

interface AudienceBannerProps {
  audiences: string[];
}

export default function AudienceBanner({ audiences }: AudienceBannerProps): JSX.Element {
  return (
    <div className="audience-banner">
      <span style={{ fontWeight: 600, marginRight: '0.25rem' }}>Target Audience:</span>
      {audiences.map((a) => (
        <span key={a} className="audience-tag">
          {a}
        </span>
      ))}
    </div>
  );
}
