export interface SkillCategory {
  name: string;
  accent: 'warm' | 'cool' | 'gold';
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    accent: 'warm',
    skills: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'Chakra UI', 'Emotion', 'React Query'],
  },
  {
    name: 'Backend & Infra',
    accent: 'cool',
    skills: ['Node.js', 'AWS Lambda', 'SQS', 'DynamoDB', 'Django', 'MySQL', 'Redis', 'Kafka'],
  },
  {
    name: 'Tools & Practices',
    accent: 'gold',
    skills: ['Shopify Integration', 'Design Systems', 'Serverless', 'Microservices', 'E-commerce', 'Agile'],
  },
];
