export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/73nko', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/alejandroperez', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/73nko', icon: 'twitter' },
  { name: 'Email', url: 'mailto:me@alejandroperez.dev', icon: 'mail' },
];
