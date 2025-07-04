import { Skill } from '@/functions/getSkillColor'

/**
 * A unified interface for all types of work, combining properties from
 * Experience, Event, Projet, and FormationsCertification.
 */
export type WorkDetails = {
   // Common properties required by all projects.
   title: string;
   description: string;

   image_path: string;           // Path to the high-res media.
   low_quality_path?: string;    // Path to the low-res media.
   thumbnail_path?: string;      // Path to the thumbnail image.

   skills: Skill[];

   // Optional properties.
   date?: string;
   link?: string;
   github?: string;

   space_only?: boolean;

   category?: string
};