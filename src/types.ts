import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LucideIcon } from 'lucide-react';

export interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  link: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string | string[];
  techStack?: string[];
  category?: 'technical' | 'soft';
  logo?: string;
  link?: string;
  icon?: IconDefinition | LucideIcon;
}

export interface Skill {
  name: string;
  icon: IconDefinition;
  description: string;
  category: 'technical' | 'soft' | 'languages';
  level?: number;
}

export interface NpmPackage {
  name: string;
  description: string;
  command: string;
  url: string;
}

export interface Category {
  name: string;
  icon: LucideIcon;
}