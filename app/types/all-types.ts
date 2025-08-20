// Hero Section Types
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


// About Section Types
export interface Feature {
  title: string;
  description: string;
  icon: "Code" | "Palette" | "Zap";
}

export interface AboutData {
  description: string[];
  skills: string[];
  features: Feature[];
}

// ContactInfo Section Types
export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    telegram: string;
  };
}

// Skill Section Types
export interface Skill {
  name: string;
  level: number; // 0-100
}
export interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Suggestion Section Types
export interface Suggestion {
  id: string;
  name: string;
}

// Contact Section Types
export interface Submission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

// Project Section Types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

// Language Type
export type Lang = "en" | "fa";

// Experience Section Types
export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface Course {
  name: string;
  org: string;
  year: string;
}

export interface ExperienceData {
  experiences: Experience[];
  education: Education[];
  courses: Course[];
}
