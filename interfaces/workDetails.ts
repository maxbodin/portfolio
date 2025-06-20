import { Skill } from '@/functions/getSkillColor'

/**
 * A unified interface for all types of work, combining properties from
 * Experience, Event, Projet, and FormationsCertification.
 */
export type WorkDetails = {
   // Common properties required by all projects.
   title: string;
   description: string;
   image_path: string;
   skills: Skill[];

   // Optional properties.
   date?: string;
   link?: string;
   github?: string;

   grid_only?: boolean;
};