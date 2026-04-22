export interface ExperienceEntry {
  dateRange: string;
  role: string;
  company: string;
  location: string;
  description: string;
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    dateRange: 'Jun 2021 — Present',
    role: 'Senior Software Engineer',
    company: 'Awtomic',
    location: 'Remote, Spain',
    description:
      'Founding team member (#7) at YCombinator-backed startup. Architected scalable AWS serverless infrastructure (Lambda, SQS, DynamoDB) handling Shopify webhooks for 200+ businesses. Led creation of two React/Next.js frontend applications with custom design system.',
    current: true,
  },
  {
    dateRange: 'Sep 2019 — Jun 2021',
    role: 'Senior Software Engineer',
    company: 'Eventbrite',
    location: 'Remote, Spain',
    description:
      'Migrated critical high-traffic services from monolithic to service-oriented architecture. Integrated Zoom with Online Events, increasing online events from 6% to nearly 30%. Built with React, TypeScript, Django, MySQL, Redis, and Kafka.',
  },
  {
    dateRange: 'Dec 2018 — Aug 2019',
    role: 'Senior Frontend Developer',
    company: 'Electronic Arts (EA)',
    location: 'Madrid, Spain',
    description:
      'Senior frontend development for internal tools and gaming platforms.',
  },
  {
    dateRange: 'Sep 2018 — Dec 2018',
    role: 'Senior Software Engineer',
    company: 'ING Bank',
    location: 'Madrid, Spain',
    description:
      'Frontend engineering for banking applications.',
  },
  {
    dateRange: 'Dec 2017 — Sep 2018',
    role: 'JavaScript Engineer',
    company: 'Solera Global Data & Content',
    location: 'Madrid, Spain',
    description:
      'JavaScript development for data and content management platforms.',
  },
  {
    dateRange: 'Feb 2016 — Sep 2017',
    role: 'JavaScript Engineer',
    company: 'Mediaset España',
    location: 'Madrid, Spain',
    description:
      'Frontend development for media and broadcasting platforms.',
  },
  {
    dateRange: 'Jan 2013 — Feb 2016',
    role: 'Junior Software Engineer',
    company: 'Babel',
    location: 'Madrid, Spain',
    description:
      'Full-stack web development, database management, and server administration. First steps into the JavaScript ecosystem.',
  },
];
