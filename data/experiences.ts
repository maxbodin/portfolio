import { Skill } from '@/functions/getSkillColor'
import { WorkDetails } from '@/interfaces/workDetails'

export const experiencesItems: WorkDetails[] = [
   {
      title: 'Fullstack Developer Apprentice',
      description: 'Maintien en condition opérationnelle d’applications internes.',
      link: 'https://www.nextlane.com/fr/',
      image_path: '/images/nextlane.webp',
      skills: [Skill.PHP, Skill.JAVASCRIPT, Skill.SQL, Skill.AGILE, Skill.SDK_AWS, Skill.GESTION_PROJ, Skill.GITLAB],
      date: '2024-2027',
   },
   {
      title: 'Alternant Développeur SI',
      description: 'Maintien en condition opérationnelle d’applications internes et développement d’outils pour répondre à des besoins métiers spécifiques (Application pour la centralisation de la veille, application d’aide à la décision, automatisation d’insertion d’un grand nombre de données, POC de chatbot IA RAG)',
      link: 'https://www.enedis.fr',
      image_path: '/images/enedis-logo.webp',
      skills: [Skill.ANGULAR, Skill.TYPESCRIPT, Skill.EXPRESS, Skill.SQL, Skill.SDK_AWS, Skill.PYTHON, Skill.SELENIUM, Skill.IA, Skill.RAG, Skill.REL_CLIENT, Skill.GESTION_PROJ, Skill.GITLAB],
      date: '2023-2024',
   },
   {
      title: 'Stagiaire Développeur Web',
      description: 'Implémentation de nouvelles fonctionnalités pour une application web existante tout en garantissant son maintien en condition opérationnelle par des tests automatisés',
      link: 'https://www.enedis.fr',
      image_path: '/images/enedis-logo.webp',
      skills: [Skill.ANGULAR, Skill.TYPESCRIPT, Skill.EXPRESS, Skill.SQL, Skill.AGILE, Skill.TDD, Skill.JEST, Skill.MOCHA, Skill.ISTANBUL],
      date: '2023',
   },
]