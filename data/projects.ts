import { Projet } from '@/interfaces/projet'
import { Skill } from '@/functions/getSkillColor'

export const projectsItems: Projet[] = [
   {
      title: 'Earth3D',
      description: 'Earth3D est un outil de visualisation de la Terre et de données sur celle-ci, qui a pour objectif de remplacer Google Earth. Cet outil est encore en développement.',
      link: 'https://earth3d.vercel.app/',
      github: 'https://github.com/maxbodin/earth3d',
      image_path: '/images/earth3D_001.webp',
      skills: [Skill.NEXT_JS, Skill.THREE_JS, Skill.TAILWIND, Skill.SHADCN_UI],
   },
   {
      title: 'Visite Patrimoine',
      description: 'Projet en équipe, réalisé dans le cadre de ma 3ème année de BUT Informatique à l\'IUT de La Rochelle. Conception et réalisation d’une application innovante aidant la visite du patrimoine de La Rochelle. En tant que lead développeur de l\'équipe, j\'ai eu l\'opportunité de guider mes collègues dans l\'adoption de bonnes pratiques de développement, contribuant ainsi à la production d\'une application robuste et pérenne.',
      image_path: '/images/visite_patrimoine.gif',
      skills: [Skill.FLUTTER, Skill.SYMFONY, Skill.API_PLATFORM, Skill.REST, Skill.ORS, Skill.GESTION_PROJ],
   },
   {
      title: 'Island Survivors V2',
      description: 'Mise à jour du jeu Island Survivors, réalisé initialement pendant la Game Jam GMTK 2023.',
      link: 'https://makzime.itch.io/island-survivors-chaos-upgrade',
      image_path: '/images/island_survivors_v2.gif',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GITLAB, Skill.GESTION_PROJ, Skill.GAME_DESIGN, Skill.GIMP, Skill.PAINT_NET],
   },
   {
      title: 'IOT Smart Campus',
      description: 'Création d\'un système d\'acquisition composé d\'un ESP32 relié à des capteurs de température, d\'humidité et de co2. Conception et développement du programme de récupération des données des capteurs et d’envoi de ces données à une API, en C++. Réalisation d\'une application web React servant d’outil diagnostique pour les capteurs de qualité de l’air, installés au sein de l’IUT de La Rochelle. L\'application permet aux utilisateurs de consulter les températures des salles et de recevoir un éco-conseil en fonction de la qualité de l\'air, mais aussi aux techniciens de configurer l\'acquisition et l\'envoi des données à partir d\'une interface. Optimisation de la consommation du système.',
      image_path: '/images/smart_campus_iot.gif',
      skills: [Skill.HTML, Skill.PHP, Skill.SYMFONY, Skill.TAILWIND, Skill.CPP, Skill.TRAV_EQUIP, Skill.GIT, Skill.AGILE, Skill.DOCKER, Skill.SQL, Skill.PHPUNIT],
   },
   {
      title: 'Wild Hat West',
      description: 'Conception et réalisation d\'un jeu vidéo 2D, en C# avec Unity.',
      link: 'https://makzime.itch.io/wild-hat-west',
      github: 'https://github.com/maxkzime/WildHatWest',
      image_path: '/images/wildhatwest.png',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GAME_DESIGN, Skill.PLASTIC_SCM, Skill.RESOLUTION_PROB, Skill.GESTION_PROJ],
   },
   {
      title: 'IUT FIGHTER',
      description: 'Conception et réalisation en équipe d\'un jeu inspiré du jeu Street Fighter 2, développé en C++ avec le framework graphique Qt. J\'ai, entre autres, conçu un système de hitbox et un système de personnalisation des touches..',
      image_path: '/images/iutfighter.gif',
      skills: [Skill.TRAV_EQUIP, Skill.GAME_DESIGN, Skill.CPP, Skill.QT, Skill.POO, Skill.GESTION_PROJ, Skill.GIT, Skill.KANBAN],
   },
]