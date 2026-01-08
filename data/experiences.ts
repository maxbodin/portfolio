/* eslint-disable max-len */
import { Skill } from '@/functions/getSkillColor'
import { WorkDetails } from '@/interfaces/workDetails'

export const experiencesItems: WorkDetails[] = [
   {
      date: '2024-2027',
      description:
         'Performed full-stack development on legacy systems, enhancing features, fixing bugs, and refactoring core modules with OOP to reduce technical debt.\n' +
         'Collaborated in a pair-programming environment to re-engineer a legacy database maintenance script, successfully cutting processing time by half and improving system reliability.\n' +
         'Ensured a seamless migration of critical applications to AWS by participating in the non-regression testing strategy.\n' +
         'Improved user experience and operational efficiency by implementing real-time UI updates and integrating a knowledge base to reduce support tickets.',
      image_path: '/images/nextlane.webp',
      link: 'https://www.nextlane.com/fr/',
      skills: [Skill.PHP, Skill.JAVASCRIPT, Skill.SQL, Skill.AGILE, Skill.SDK_AWS, Skill.GESTION_PROJ, Skill.GITLAB],
      title: 'Fullstack Developer Apprentice',
   },
   {
      date: '2023-2024',
      description:
         'Engineered automation tools using Python and Selenium with multi-threading, increasing data processing efficiency.\n' +
         'Enhanced, maintained and scaled web applications, ensuring high availability and operational reliability through rigorous testing.\n' +
         'Developed a Proof of Concept (POC) for an AI RAG Chatbot to automate document information retrieval for internal teams.',
      image_path: '/images/enedis-logo.webp',
      link: 'https://www.enedis.fr',
      skills: [Skill.ANGULAR, Skill.TYPESCRIPT, Skill.EXPRESS, Skill.SQL, Skill.SDK_AWS, Skill.PYTHON, Skill.SELENIUM, Skill.IA, Skill.RAG, Skill.REL_CLIENT, Skill.GESTION_PROJ, Skill.GITLAB],
      title: 'Alternant Développeur SI',
   },
   {
      date: '2023',
      description: 'Delivered new features for a production web application using a modern Angular stack, while ensuring operational reliability through automated testing.',
      image_path: '/images/enedis-logo.webp',
      link: 'https://www.enedis.fr',
      skills: [Skill.ANGULAR, Skill.TYPESCRIPT, Skill.EXPRESS, Skill.SQL, Skill.AGILE, Skill.TDD, Skill.JEST, Skill.MOCHA, Skill.ISTANBUL],
      title: 'Stagiaire Développeur Web',
   },
]