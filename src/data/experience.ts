export interface ExperienceEntry {
  dateRange: string;
  role: string;
  company: string;
  location: string;
  description: string;
  bullets?: string[];
  current?: boolean;
  collapsed?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    dateRange: '2021 — Present',
    role: 'Founding Engineer',
    company: 'Awtomic (YC S20)',
    location: 'Remote, Spain',
    description:
      'Designed and own a multi-tenant, event-driven AWS pipeline (Lambda + SQS + DynamoDB) processing Shopify webhooks across 200+ merchants.',
    bullets: [
      'Idempotent retries and per-tenant queue isolation: a noisy merchant cannot starve the rest of the platform.',
      'Observability that catches drift before customers do — structured logs, metrics, and synthetic checks across the webhook path.',
      'Built two production React/Next.js storefront integrations on a shared design system, used in millions of customer transactions.',
    ],
    current: true,
  },
  {
    dateRange: '2019 — 2021',
    role: 'Senior Software Engineer',
    company: 'Eventbrite',
    location: 'Remote, Spain',
    description:
      'Migrated critical high-traffic surfaces from a Python monolith into event-driven services (Kafka + Redis + MySQL).',
    bullets: [
      'Led the Zoom + Online Events integration that grew the share of online events from ~6% to ~30% of the catalog.',
      'Owned frontend slices in React/TypeScript through the migration, keeping the user-facing path stable while the backend reshaped underneath.',
    ],
  },
  {
    dateRange: '2013 — 2019',
    role: 'Previously',
    company: 'EA · ING · Solera · Mediaset · Babel',
    location: 'Madrid, Spain',
    description:
      '10+ years across gaming, banking, automotive data, broadcast media, and consultancy. Frontend engineering and JavaScript platforms — the foundation that the rest of this page is built on.',
    collapsed: true,
  },
];
