import React, { useState } from 'react';
import styles from './styles.module.css';

interface UIElement {
  id: string;
  label: string;
  icon: string;
  type: 'button' | 'input' | 'link';
  scraperView: {
    selector: string;
    problem: string;
  };
  axagView: {
    intent: string;
    entity: string;
    actionType: string;
    riskLevel: string;
    extra?: string;
  };
}

const elements: UIElement[] = [
  {
    id: 'search',
    label: 'Search',
    icon: '🔍',
    type: 'button',
    scraperView: {
      selector: 'button.btn-primary:first-child',
      problem: 'Selector breaks if CSS class is renamed',
    },
    axagView: {
      intent: 'product.search',
      entity: 'product',
      actionType: 'read',
      riskLevel: 'none',
      extra: 'idempotent: true',
    },
  },
  {
    id: 'add-to-cart',
    label: 'Add to Cart',
    icon: '🛒',
    type: 'button',
    scraperView: {
      selector: 'div.product-actions > button:nth-child(2)',
      problem: 'Breaks if DOM structure changes',
    },
    axagView: {
      intent: 'cart.add_item',
      entity: 'cart',
      actionType: 'write',
      riskLevel: 'low',
      extra: 'params: ["product_id", "quantity"]',
    },
  },
  {
    id: 'checkout',
    label: 'Checkout',
    icon: '💳',
    type: 'button',
    scraperView: {
      selector: 'a[href*="checkout"]',
      problem: 'Breaks if URL pattern changes',
    },
    axagView: {
      intent: 'checkout.start',
      entity: 'order',
      actionType: 'write',
      riskLevel: 'high',
      extra: 'confirmation: true',
    },
  },
  {
    id: 'delete',
    label: 'Remove Item',
    icon: '🗑️',
    type: 'button',
    scraperView: {
      selector: 'button[aria-label="Remove"]',
      problem: 'Breaks if aria-label is localized',
    },
    axagView: {
      intent: 'cart.remove_item',
      entity: 'cart',
      actionType: 'delete',
      riskLevel: 'medium',
      extra: 'confirmation: true',
    },
  },
];

export default function HomepageAgentView(): JSX.Element {
  const [isAxag, setIsAxag] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  return (
    <section className={styles.agentView}>
      <div className="container">
        <div className={styles.header}>
          <h2>The Agent's Perspective</h2>
          <p>
            Toggle between what a scraper sees and what an AXAG-powered agent understands.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className={styles.toggleContainer}>
          <span className={`${styles.toggleLabel} ${!isAxag ? styles.toggleLabelActive : ''}`}>
            🕷️ Scraper View
          </span>
          <button
            className={`${styles.toggle} ${isAxag ? styles.toggleOn : ''}`}
            onClick={() => setIsAxag(!isAxag)}
            aria-label="Toggle between scraper and AXAG view"
          >
            <div className={styles.toggleKnob} />
          </button>
          <span className={`${styles.toggleLabel} ${isAxag ? styles.toggleLabelActive : ''}`}>
            ✨ AXAG View
          </span>
        </div>

        {/* Mock UI */}
        <div className={`${styles.mockUI} ${isAxag ? styles.mockUIAxag : styles.mockUIScraper}`}>
          <div className={styles.mockHeader}>
            <div className={styles.mockLogo}>🛍️ ShopDemo</div>
            <div className={styles.mockNav}>Products &nbsp; Cart &nbsp; Account</div>
          </div>

          <div className={styles.mockBody}>
            {/* Product Card */}
            <div className={styles.productCard}>
              <div className={styles.productImage}>📦</div>
              <div className={styles.productInfo}>
                <h4>Wireless Headphones</h4>
                <p className={styles.productPrice}>$79.99</p>
              </div>

              {/* Interactive Elements */}
              <div className={styles.actions}>
                {elements.map((el) => (
                  <div
                    key={el.id}
                    className={styles.actionWrapper}
                    onMouseEnter={() => setHoveredElement(el.id)}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    <button
                      className={`${styles.mockButton} ${
                        isAxag ? styles.mockButtonAxag : styles.mockButtonScraper
                      } ${
                        el.axagView.riskLevel === 'high'
                          ? styles.mockButtonDanger
                          : el.axagView.riskLevel === 'medium'
                          ? styles.mockButtonWarn
                          : ''
                      }`}
                    >
                      {el.icon} {el.label}
                    </button>

                    {/* Tooltip */}
                    {hoveredElement === el.id && (
                      <div
                        className={`${styles.tooltip} ${
                          isAxag ? styles.tooltipAxag : styles.tooltipScraper
                        }`}
                      >
                        {isAxag ? (
                          <>
                            <div className={styles.tooltipTitle}>✅ Semantic Contract</div>
                            <div className={styles.tooltipRow}>
                              <span>intent:</span> <code>{el.axagView.intent}</code>
                            </div>
                            <div className={styles.tooltipRow}>
                              <span>entity:</span> <code>{el.axagView.entity}</code>
                            </div>
                            <div className={styles.tooltipRow}>
                              <span>action:</span> <code>{el.axagView.actionType}</code>
                            </div>
                            <div className={styles.tooltipRow}>
                              <span>risk:</span>
                              <code className={
                                el.axagView.riskLevel === 'high' ? styles.riskHigh :
                                el.axagView.riskLevel === 'medium' ? styles.riskMedium :
                                styles.riskLow
                              }>
                                {el.axagView.riskLevel}
                              </code>
                            </div>
                            {el.axagView.extra && (
                              <div className={styles.tooltipRow}>
                                <code className={styles.tooltipExtra}>{el.axagView.extra}</code>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div className={styles.tooltipTitle}>⚠️ Fragile Selector</div>
                            <code className={styles.tooltipSelector}>
                              {el.scraperView.selector}
                            </code>
                            <div className={styles.tooltipProblem}>
                              {el.scraperView.problem}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className={styles.caption}>
          Hover over each button to see what the {isAxag ? 'agent reads' : 'scraper targets'}.
        </p>
      </div>
    </section>
  );
}
