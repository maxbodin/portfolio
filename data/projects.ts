import { Skill } from '@/functions/getSkillColor'
import { WorkDetails } from '@/interfaces/workDetails'

export const projectsItems: WorkDetails[] = [
   {
      description: 'BookHive makes it easy to organize your books, set reading goals, and track your reading activity in one place.',
      github: 'https://github.com/maxbodin/bookhive',
      image_path: '/images/bookhive.png',
      link: 'https://bookhive.maximebodin.com/',
      skills: [Skill.NEXT_JS, Skill.TAILWIND, Skill.SHADCN_UI],
      title: 'BookHive',
   },
   {
      description: 'Minimalist gallery for my film photography. Built with Next.js and Vercel Blob.',
      github: 'https://github.com/maxbodin/argentique',
      image_path: '/images/argentique.png',
      link: 'https://argentique.maximebodin.com/',
      skills: [Skill.NEXT_JS, Skill.TAILWIND, Skill.SHADCN_UI],
      title: 'Argentique',
   },
   {
      description: 'Earth3D is an open-source 3D visualization tool for the Earth and its data, which aims to replace Google Earth. This tool is still under development.',
      github: 'https://github.com/maxbodin/earth3d',
      image_path: '/images/earth3D_001.webp',
      link: 'https://earth3d.vercel.app/',
      skills: [Skill.NEXT_JS, Skill.THREE_JS, Skill.TAILWIND, Skill.SHADCN_UI],
      title: 'Earth3D',
   },
   {
      description: 'Team project carried out as part of my 3rd year of a BUT in Computer Science at the IUT of La Rochelle. Design and implementation of an innovative application to help visit the heritage of La Rochelle. As the team\'s lead developer, I had the opportunity to guide my colleagues in adopting good development practices, thus contributing to the production of a robust and sustainable application.',
      image_path: '/videos/visite_patrimoine.webm',
      skills: [Skill.FLUTTER, Skill.SYMFONY, Skill.API_PLATFORM, Skill.REST, Skill.ORS, Skill.GESTION_PROJ],
      title: 'Visite Patrimoine',
   },
   {
      description: 'Update of the game Island Survivors, initially created during the GMTK 2023 Game Jam.',
      image_path: '/videos/island_survivors_v2.webm',
      link: 'https://makzime.itch.io/island-survivors-chaos-upgrade',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GITLAB, Skill.GESTION_PROJ, Skill.GAME_DESIGN, Skill.GIMP, Skill.PAINT_NET],
      title: 'Island Survivors V2',
   },
   {
      description: 'Creation of an acquisition system composed of an ESP32 connected to temperature, humidity, and CO2 sensors. Design and development of the program to retrieve data from the sensors and send this data to an API, in C++. Creation of a React web application serving as a diagnostic tool for the air quality sensors installed within the IUT of La Rochelle. The application allows users to consult the temperatures of the rooms and receive eco-advice based on the air quality, but also allows technicians to configure the acquisition and sending of data from an interface. Optimization of the system\'s consumption.',
      image_path: '/videos/smart_campus_iot.webm',
      skills: [Skill.HTML, Skill.PHP, Skill.SYMFONY, Skill.TAILWIND, Skill.CPP, Skill.TRAV_EQUIP, Skill.GIT, Skill.AGILE, Skill.DOCKER, Skill.SQL, Skill.PHPUNIT],
      title: 'IOT Smart Campus',
   },
   {
      description: 'Design and creation of a 2D video game, in C# with Unity.',
      github: 'https://github.com/maxkzime/WildHatWest',
      image_path: '/images/wildhatwest.webp',
      link: 'https://makzime.itch.io/wild-hat-west',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GAME_DESIGN, Skill.PLASTIC_SCM, Skill.RESOLUTION_PROB, Skill.GESTION_PROJ],
      title: 'Wild Hat West',
   },
   {
      description: 'Team design and creation of a game inspired by Street Fighter 2, developed in C++ with the Qt graphics framework. Among other things, I designed a hitbox system and a key customization system.',
      image_path: '/videos/iutfighter.webm',
      skills: [Skill.TRAV_EQUIP, Skill.GAME_DESIGN, Skill.CPP, Skill.QT, Skill.POO, Skill.GESTION_PROJ, Skill.GIT, Skill.KANBAN],
      title: 'IUT FIGHTER',
   },
]