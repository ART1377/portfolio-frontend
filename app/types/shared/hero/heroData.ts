export interface HeroData {
  name: string;
  initials: string;
  roles: string[];
  bio: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}