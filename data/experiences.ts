import { Skill } from '@/functions/getSkillColor'
import { WorkDetails } from '@/interfaces/workDetails'

export const experiencesItems: WorkDetails[] = [
   {
      date: '2024-2027',
      description:
         'Designed and deployed a secure digital document signing workflow with authenticated API callbacks and secure optimized caching, improving performance, reliability, and user experience.\n\n' +
         'Monitored legal and tax regulation changes and implemented updates in a nationwide tax calculation engine, ensuring continuous compliance and uninterrupted service at scale.\n\n' +
         'Re engineered a database maintenance script through pair programming, cutting processing time by 50% and increasing execution reliability.\n\n' +
         'Supported migration of business critical applications to AWS through non regression testing and release validation.\n\n' +
         'Improved user experience and operational efficiency by implementing real time interface updates and integrating an internal knowledge base that reduced support requests.\n\n' +
         'Refactored legacy modules using object oriented design principles, reducing technical debt and improving maintainability.\n\n',
      main_image_path: '/images/nextlane.webp',
      link: 'https://www.nextlane.com/fr/',
      skills: [Skill.PHP, Skill.JAVASCRIPT, Skill.SQL, Skill.REST_API, Skill.SEC, Skill.POO, Skill.DEV_WEB, Skill.AGILE, Skill.SDK_AWS, Skill.TRAV_EQUIP, Skill.COM, Skill.GESTION_PROJ, Skill.GITLAB],
      title: 'Full-Stack Developer Apprentice',
   },
   {
      date: '2023-2024',
      description:
         'Engineered a multi-threaded automation tool using Python and Selenium, featuring a dedicated GUI. This tool significantly accelerated the process of importing complex relational data from CSV files into web forms.\n\n' +
         'Enhanced and maintained two production web applications by implementing new functionalities while guaranteeing system uptime and reliability through a robust testing strategy.\n\n' +
         'Developed a Proof of Concept (POC) for an AI RAG Chatbot to automate document information retrieval for internal teams.\n\n' +
         'Led the initial project phase for a new tool, from gathering stakeholder requirements and defining user needs to creating the core architectural design\n\n',
      main_image_path: '/images/enedis-logo.webp',
      link: 'https://www.enedis.fr',
      skills: [Skill.ANGULAR, Skill.TYPESCRIPT, Skill.JAVASCRIPT, Skill.EXPRESS, Skill.DEV_WEB, Skill.SQL, Skill.SDK_AWS, Skill.PYTHON, Skill.SELENIUM, Skill.MULTITHREADING, Skill.CSV, Skill.TDD, Skill.IA, Skill.RAG, Skill.REL_CLIENT, Skill.GESTION_PROJ, Skill.GITLAB],
      title: 'Full-Stack Developer Apprentice',
   },
   {
      date: '2023',
      description:
         'Delivered new features for a production web application using a modern Angular stack, while ensuring operational reliability through automated testing.\n\n' +
         '- Audited the existing codebase to identify key areas for improvement in performance and maintainability.\n\n' +
         '- Refactored data aggregation pipelines to significantly boost data accuracy and integrity.\n\n' +
         '- Engineered several user-centric features that improved the application\'s overall usability and user experience.\n\n' +
         '- Architected and integrated a secure and scalable file management system for document uploads and retrieval.\n\n' +
         '- Built a comprehensive testing suite with unit and integration tests, boosting code coverage from 0% to 95% and drastically reducing production bugs.\n\n',
      main_image_path: '/images/enedis-logo.webp',
      link: 'https://www.enedis.fr',
      skills: [Skill.ANGULAR, Skill.TYPESCRIPT, Skill.JAVASCRIPT, Skill.EXPRESS, Skill.DEV_WEB, Skill.SQL, Skill.SEC, Skill.AGILE, Skill.TDD, Skill.JEST, Skill.MOCHA, Skill.ISTANBUL],
      title: 'Web Developer Intern',
   },
]