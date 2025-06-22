import { Skill } from '@/functions/getSkillColor'
import { WorkDetails } from '@/interfaces/workDetails'

export const projectsItems: WorkDetails[] = [
   {
      description: 'Earth3D est un outil open-source de visualisation 3D de la Terre et de données sur celle-ci, qui a pour objectif de remplacer Google Earth. Cet outil est encore en développement.',
      github: 'https://github.com/maxbodin/earth3d',
      image_path: '/images/earth3D_001.webp',
      link: 'https://earth3d.vercel.app/',
      skills: [Skill.NEXT_JS, Skill.THREE_JS, Skill.TAILWIND, Skill.SHADCN_UI],
      title: 'Earth3D',
   },
   {
      description: 'Projet en équipe, réalisé dans le cadre de ma 3ème année de BUT Informatique à l\'IUT de La Rochelle. Conception et réalisation d’une application innovante aidant la visite du patrimoine de La Rochelle. En tant que lead développeur de l\'équipe, j\'ai eu l\'opportunité de guider mes collègues dans l\'adoption de bonnes pratiques de développement, contribuant ainsi à la production d\'une application robuste et pérenne.',
      image_path: '/videos/visite_patrimoine.webm',
      skills: [Skill.FLUTTER, Skill.SYMFONY, Skill.API_PLATFORM, Skill.REST, Skill.ORS, Skill.GESTION_PROJ],
      title: 'Visite Patrimoine',
   },
   {
      description: 'Mise à jour du jeu Island Survivors, réalisé initialement pendant la Game Jam GMTK 2023.',
      image_path: '/videos/island_survivors_v2.webm',
      link: 'https://makzime.itch.io/island-survivors-chaos-upgrade',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GITLAB, Skill.GESTION_PROJ, Skill.GAME_DESIGN, Skill.GIMP, Skill.PAINT_NET],
      title: 'Island Survivors V2',
   },
   {
      description: 'Création d\'un système d\'acquisition composé d\'un ESP32 relié à des capteurs de température, d\'humidité et de co2. Conception et développement du programme de récupération des données des capteurs et d’envoi de ces données à une API, en C++. Réalisation d\'une application web React servant d’outil diagnostique pour les capteurs de qualité de l’air, installés au sein de l’IUT de La Rochelle. L\'application permet aux utilisateurs de consulter les températures des salles et de recevoir un éco-conseil en fonction de la qualité de l\'air, mais aussi aux techniciens de configurer l\'acquisition et l\'envoi des données à partir d\'une interface. Optimisation de la consommation du système.',
      image_path: '/videos/smart_campus_iot.webm',
      skills: [Skill.HTML, Skill.PHP, Skill.SYMFONY, Skill.TAILWIND, Skill.CPP, Skill.TRAV_EQUIP, Skill.GIT, Skill.AGILE, Skill.DOCKER, Skill.SQL, Skill.PHPUNIT],
      title: 'IOT Smart Campus',
   },
   {
      description: 'Conception et réalisation d\'un jeu vidéo 2D, en C# avec Unity.',
      github: 'https://github.com/maxkzime/WildHatWest',
      image_path: '/images/wildhatwest.webp',
      link: 'https://makzime.itch.io/wild-hat-west',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GAME_DESIGN, Skill.PLASTIC_SCM, Skill.RESOLUTION_PROB, Skill.GESTION_PROJ],
      title: 'Wild Hat West',
   },
   {
      description: 'Conception et réalisation en équipe d\'un jeu inspiré du jeu Street Fighter 2, développé en C++ avec le framework graphique Qt. J\'ai, entre autres, conçu un système de hitbox et un système de personnalisation des touches..',
      image_path: '/videos/iutfighter.webm',
      skills: [Skill.TRAV_EQUIP, Skill.GAME_DESIGN, Skill.CPP, Skill.QT, Skill.POO, Skill.GESTION_PROJ, Skill.GIT, Skill.KANBAN],
      title: 'IUT FIGHTER',
   },
]