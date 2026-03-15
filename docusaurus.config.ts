import { axagLight, axagDark } from './src/theme/prism-themes';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AXAG Standard',
  tagline: 'Agent Context Annotation Guidelines — Designing Interfaces for AI Agents as First-Class Clients',
  favicon: 'img/favicon.svg',

  url: 'https://axag.org',
  baseUrl: '/',

  organizationName: 'web-axag',
  projectName: 'axag-docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/web-axag/axag-docs/tree/main/',
          remarkPlugins: [],
          rehypePlugins: [],
        },
        blog: false,
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/code-blocks.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/axag-social-card.png',

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    /* Global copy button on all code blocks */
    codeBlock: {
      showCopyButton: true,
    },

    navbar: {
      title: 'AXAG',
      logo: {
        alt: 'AXAG Standard Logo',
        src: 'img/axag-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/specification/overview',
          label: 'Specification',
          position: 'left',
        },
        {
          to: '/docs/use-cases/overview',
          label: 'Use Cases',
          position: 'left',
        },
        {
          to: '/docs/examples/overview',
          label: 'Examples',
          position: 'left',
        },
        {
          to: '/docs/reference/schema-reference',
          label: 'Reference',
          position: 'left',
        },
        {
          href: 'https://github.com/web-axag/axag-docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            { label: 'Introduction', to: '/docs/intro/what-is-ax' },
            { label: 'Getting Started', to: '/docs/getting-started/mental-model' },
            { label: 'Core Concepts', to: '/docs/concepts/agent-experience' },
            { label: 'Tutorials', to: '/docs/tutorials/add-axag-to-page' },
          ],
        },
        {
          title: 'Specification',
          items: [
            { label: 'Overview', to: '/docs/specification/overview' },
            { label: 'Vocabulary', to: '/docs/specification/vocabulary' },
            { label: 'Semantic Manifest', to: '/docs/semantic-manifest/what-it-is' },
            { label: 'Tool Generation', to: '/docs/tool-generation/mapping-rules' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Contributing', to: '/docs/contributors/guide' },
            { label: 'Governance', to: '/docs/governance/ownership-model' },
            { label: 'GitHub (Docs)', href: 'https://github.com/web-axag/axag-docs' },
            { label: 'GitHub (CLI)', href: 'https://github.com/axag-cli' },
            { label: 'Discussions', href: 'https://github.com/web-axag/axag-docs/discussions' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'FAQ', to: '/docs/faq' },
            { label: 'Glossary', to: '/docs/reference/glossary' },
            { label: 'Anti-Patterns', to: '/docs/examples/anti-patterns' },
            { label: 'Reference', to: '/docs/reference/schema-reference' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AXAG Standard Contributors. Built with Docusaurus.`,
    },

    prism: {
      theme: axagLight,
      darkTheme: axagDark,
      defaultLanguage: 'html',
      additionalLanguages: [
        'json',
        'bash',
        'typescript',
        'jsx',
        'tsx',
        'yaml',
        'markup',
        'css',
        'python',
        'diff',
        'http',
        'graphql',
        'sql',
      ],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'axag-attr-highlight',
          line: 'axag-highlight-next-line',
          block: { start: 'axag-highlight-start', end: 'axag-highlight-end' },
        },
      ],
    },

    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    metadata: [
      {
        name: 'keywords',
        content: 'AXAG, agent experience, semantic contract, MCP, AI agents, accessibility, web standards',
      },
      {
        name: 'og:description',
        content: 'AXAG Standard — Designing Interfaces for AI Agents as First-Class Clients',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
