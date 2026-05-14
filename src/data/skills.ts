export interface SkillCategory {
  name: string;
  accent: 'warm' | 'cool' | 'gold';
  skills: string[];
}

export const investingIn: SkillCategory = {
  name: 'Currently investing in',
  accent: 'cool',
  skills: [
    'Distributed systems',
    'OpenTelemetry',
    'ClickHouse for analytics workloads',
    'React Server Components',
    'Edge runtimes',
    'System design at scale',
  ],
};

export const productionExperience: SkillCategory = {
  name: 'Production experience',
  accent: 'warm',
  skills: [
    'Node.js',
    'TypeScript',
    'React',
    'Next.js',
    'AWS (Lambda, SQS, DynamoDB)',
    'Django',
    'Kafka',
    'Redis',
    'MySQL',
    'Design systems',
  ],
};
