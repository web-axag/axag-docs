import React, { useRef, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/* ─── Domain data ─────────────────────────────── */

interface DomainCard {
  icon: string;
  title: string;
  link: string;
  annotation: string;
  tool: string;
  color: string;
}

const domains: DomainCard[] = [
  {
    icon: '🛒',
    title: 'E-Commerce',
    link: '/docs/use-cases/ecommerce/product-search',
    annotation: `axag-intent="product.search"\naxag-entity="product"\naxag-action-type="read"`,
    tool: `product_search(query, category?)`,
    color: '#6366f1',
  },
  {
    icon: '📊',
    title: 'Analytics',
    link: '/docs/use-cases/analytics/dashboard-filtering',
    annotation: `axag-intent="report.generate"\naxag-entity="report"\naxag-action-type="read"\naxag-async="true"`,
    tool: `report_generate(date_range, metrics)`,
    color: '#0ea5e9',
  },
  {
    icon: '💼',
    title: 'Sales & CRM',
    link: '/docs/use-cases/crm/lead-creation',
    annotation: `axag-intent="lead.create"\naxag-entity="lead"\naxag-action-type="write"\naxag-risk-level="low"`,
    tool: `lead_create(name, email, company?)`,
    color: '#f59e0b',
  },
  {
    icon: '✈️',
    title: 'Travel',
    link: '/docs/use-cases/travel/search-and-reservation',
    annotation: `axag-intent="flight.search"\naxag-entity="flight"\naxag-action-type="read"`,
    tool: `flight_search(origin, dest, date)`,
    color: '#10b981',
  },
  {
    icon: '📣',
    title: 'Marketing',
    link: '/docs/use-cases/marketing/campaign-creation',
    annotation: `axag-intent="campaign.create"\naxag-entity="campaign"\naxag-action-type="write"\naxag-risk-level="medium"`,
    tool: `campaign_create(name, audience, budget)`,
    color: '#ec4899',
  },
  {
    icon: '🎫',
    title: 'Support',
    link: '/docs/use-cases/support/ticket-creation',
    annotation: `axag-intent="ticket.create"\naxag-entity="ticket"\naxag-action-type="write"`,
    tool: `ticket_create(subject, description)`,
    color: '#8b5cf6',
  },
  {
    icon: '🏢',
    title: 'Enterprise',
    link: '/docs/use-cases/enterprise/crud-dashboard',
    annotation: `axag-intent="user.deactivate"\naxag-entity="user"\naxag-action-type="write"\naxag-risk-level="critical"\naxag-approval-required="true"`,
    tool: `user_deactivate(user_id) [approval]`,
    color: '#ef4444',
  },
  {
    icon: '💼',
    title: 'Jobs',
    link: '/docs/use-cases/jobs/job-search',
    annotation: `axag-intent="job.search"\naxag-entity="job"\naxag-action-type="read"`,
    tool: `job_search(keywords, location?)`,
    color: '#14b8a6',
  },
];

/* ─── Infinite ticker carousel ────────────────── */

export default function HomepageDomainCarousel(): JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  /*  We use requestAnimationFrame to scroll the track continuously.
      When the first set of cards has scrolled fully out of view we
      reset scrollLeft back by exactly one set-width, creating a
      seamless infinite loop in either direction.                    */
  const rafId = useRef<number>(0);
  const speed = useRef(0.5);            // px per frame (~30 px/s at 60 fps)
  const direction = useRef<1 | -1>(1);  // 1 = left-scroll, -1 = right-scroll

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!paused && track) {
        track.scrollLeft += speed.current * direction.current;

        // Total width of ONE set of cards (half the track content)
        const setWidth = track.scrollWidth / 2;

        // Seamless wrap: if we scrolled past the first set, jump back
        if (direction.current === 1 && track.scrollLeft >= setWidth) {
          track.scrollLeft -= setWidth;
        }
        // Wrap the other way
        if (direction.current === -1 && track.scrollLeft <= 0) {
          track.scrollLeft += setWidth;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };

    // Start midway so backward scrolling has room
    const setWidth = track.scrollWidth / 2;
    track.scrollLeft = 1; // start just past 0 so backward wrap works

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [paused]);

  return (
    <section className={styles.section}>
      <div className="container">
        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={styles.badge}>Domain-Agnostic</span>
          <h2>Works Across Every Domain</h2>
          <p>
            AXAG semantic contracts look the same whether you're building
            e-commerce, analytics, or enterprise admin. Explore 8 industries.
          </p>
        </div>
      </div>

      {/* ── Ticker track (full bleed) ── */}
      <div
        className={styles.viewport}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Domain carousel"
      >
        <div className={styles.track} ref={trackRef}>
          {/* Render cards twice for seamless looping */}
          {[...domains, ...domains].map((domain, i) => (
            <Link
              key={`${domain.title}-${i}`}
              to={domain.link}
              className={styles.card}
            >
              <div
                className={styles.cardAccent}
                style={{ background: domain.color }}
              />
              <div className={styles.cardBody}>
                <div className={styles.cardIcon}>{domain.icon}</div>
                <h4 className={styles.cardTitle}>{domain.title}</h4>

                <div className={styles.cardSection}>
                  <span className={styles.cardLabel}>Annotation</span>
                  <pre className={styles.cardCode}>{domain.annotation}</pre>
                </div>

                <div className={styles.cardSection}>
                  <span className={styles.cardLabel}>Generated Tool</span>
                  <pre className={styles.cardTool}>{domain.tool}</pre>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Fade edges */}
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />
      </div>
    </section>
  );
}
