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
  description: string;
  category?: 'technical' | 'soft';
}

export interface Skill {
  name: string;
  icon: IconDefinition;
  description: string;
  category: 'technical' | 'soft' | 'languages';
  level?: number;
}

export interface Category {
  name: string;
  icon: LucideIcon;
}