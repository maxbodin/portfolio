import { Skill } from '@/functions/getSkillColor'
import { WorkDetails } from '@/interfaces/workDetails'

export const experiencesItems: WorkDetails[] = [
   {
      date: '2024-2027',
      description: 'Maintien en condition opérationnelle d’applications internes.',
      image_path: '/images/nextlane.webp',
      link: 'https://www.nextlane.com/fr/',
      skills: [Skill.PHP, Skill.JAVASCRIPT, Skill.SQL, Skill.AGILE, Skill.SDK_AWS, Skill.GESTION_PROJ, Skill.GITLAB],
      title: 'Fullstack Developer Apprentice',
   },
   {
      date: '2023-2024',
      description: 'Maintien en condition opérationnelle d’applications internes et développement d’outils pour répondre à des besoins métiers spécifiques (Application pour la centralisation de la veille, application d’aide à la décision, automatisation d’insertion d’un grand nombre de données, POC de chatbot IA RAG)',
      image_path: '/images/enedis-logo.webp',
      link: 'https://www.enedis.fr',
      skills: [Skill.ANGULAR, Skill.TYPESCRIPT, Skill.EXPRESS, Skill.SQL, Skill.SDK_AWS, Skill.PYTHON, Skill.SELENIUM, Skill.IA, Skill.RAG, Skill.REL_CLIENT, Skill.GESTION_PROJ, Skill.GITLAB],
      title: 'Alternant Développeur SI',
   },
   {
      date: '2023',
      description: 'Implémentation de nouvelles fonctionnalités pour une application web existante tout en garantissant son maintien en condition opérationnelle par des tests automatisés',
      image_path: '/images/enedis-logo.webp',
      link: 'https://www.enedis.fr',
      skills: [Skill.ANGULAR, Skill.TYPESCRIPT, Skill.EXPRESS, Skill.SQL, Skill.AGILE, Skill.TDD, Skill.JEST, Skill.MOCHA, Skill.ISTANBUL],
      title: 'Stagiaire Développeur Web',
   },
]