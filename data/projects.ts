import { Projet } from '@/interfaces/projet'

export const projectsItems: Projet[] = [
   {
      title: 'Earth3D',
      description: 'Earth3D est un outil de visualisation de la Terre et de données sur celle-ci, qui a pour objectif de remplacer Google Earth. Cet outil est encore en développement.',
      link: 'https://earth3d.vercel.app/',
      github: 'https://github.com/maxbodin/earth3d',
      image_path: '/images/earth3D_001.webp',
      tags: ['Next.js', 'Three.js', 'Tailwind CSS', 'shadcn/ui'],
   },
   {
      title: 'Visite Patrimoine',
      description: 'Projet en équipe, réalisé dans le cadre de ma 3ème année de BUT Informatique à l\'IUT de La Rochelle. Conception et réalisation d’une application innovante aidant la visite du patrimoine de La Rochelle. En tant que lead développeur de l\'équipe, j\'ai eu l\'opportunité de guider mes collègues dans l\'adoption de bonnes pratiques de développement, contribuant ainsi à la production d\'une application robuste et pérenne.',
      image_path: '/images/wip.jpg',
      tags: ['Flutter', 'Symfony', 'API Platform', 'REST', 'Open Route Service', 'Gestion de projet'],
   },
   {
      title: 'Island Survivors V2',
      description: 'Mise à jour du jeu Island Survivors, réalisé initialement pendant la Game Jam GMTK 2023.',
      link: 'https://makzime.itch.io/island-survivors-chaos-upgrade',
      image_path: '/images/island_survivors_v2.gif',
      tags: ['Unity', 'C#', 'Gitlab', 'Gestion de projet', 'Gimp', 'Paint.net'],
   },
   {
      title: 'IOT Smart Campus',
      description: 'Création d\'un système d\'acquisition composé d\'un ESP32 relié à des capteurs de température, d\'humidité et de co2. Conception et développement du programme de récupération des données des capteurs et d’envoi de ces données à une API, en C++. Réalisation d\'une application web React servant d’outil diagnostique pour les capteurs de qualité de l’air, installés au sein de l’IUT de La Rochelle. L\'application permet aux utilisateurs de consulter les températures des salles et de recevoir un éco-conseil en fonction de la qualité de l\'air, mais aussi aux techniciens de configurer l\'acquisition et l\'envoi des données à partir d\'une interface. Optimisation de la consommation du système.',
      link: 'https://makzime.itch.io/wild-hat-west',
      image_path: '/images/wip.jpg',
      tags: ['PHP', 'Symfony', 'Tailwind CSS', 'C++', 'Travail d’équipe', 'Méthodes agiles', 'Docker', 'SQL', 'PHPUnit', 'HTML', 'Git'],
   },
   {
      title: 'Wild Hat West',
      description: 'Conception et réalisation d\'un jeu vidéo 2D, en C# avec Unity.',
      link: 'https://makzime.itch.io/wild-hat-west',
      github: 'https://github.com/maxkzime/WildHatWest',
      image_path: '/images/wildhatwest.png',
      tags: ['Conception de jeux', 'Plastic SCM', 'C#', 'Résolution de problèmes', 'Unity', 'Gestion de projet'],
   },
   {
      title: 'IUT FIGHTER',
      description: 'Conception et réalisation en équipe d\'un jeu inspiré du jeu Street Fighter 2, développé en C++ avec le framework graphique Qt. J\'ai, entre autres, conçu un système de hitbox et un système de personnalisation des touches..',
      link: 'https://makzime.itch.io/wild-hat-west',
      image_path: '/images/wip.jpg',
      tags: ['Travail d’équipe', 'Conception de jeux', 'C++', 'Qt', 'POO', 'Gestion de projet', 'Git', 'Kanban'],
   },
]