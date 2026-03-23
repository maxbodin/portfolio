import { Skill } from '@/functions/getSkillColor'
import { WorkDetails } from '@/interfaces/workDetails'

export const projectsItems: WorkDetails[] = [
   {
      description: 'BookHive makes it easy to organize your books, set reading goals, and track your reading activity in one place.',
      github: 'https://github.com/maxbodin/bookhive',
      main_image_path: '/images/opti/projects/bookhive.webp',
      link: 'https://bookhive.maximebodin.com/',
      skills: [Skill.NEXT_JS, Skill.TAILWIND, Skill.SHADCN_UI],
      title: 'BookHive',
      date: '2026',
   },
   {
      title: "Magic Eraser AI",
      description:
         "Full-stack AI-powered object removal tool.\nDraw a mask over any object in a photo and the tool generates 15 variations using Stable Diffusion inpainting across different strength and guidance parameters. " +
         "\n\nThe API is a Cloudflare Worker built with Hono and chanfana (OpenAPI 3.1), processing images with Jimp (resize, composite, and base64 encoding.)" +
         "\nTo bypass Cloudflare's 100s response timeout, jobs are submitted asynchronously via waitUntil(), stored in KV as pending/done/error, and polled by the frontend." +
         "\nThe frontend is a Vue 3 + TypeScript SPA with a canvas-based masking editor, a results grid showing all 15 variations, and progressive loading as results arrive. " +
         "\n\nDeployed entirely on Cloudflare's free tier.",
      date: "2026",
      skills: [ Skill.VUE, Skill.TYPESCRIPT, Skill.VITE, Skill.TAILWIND, Skill.CLOUDFLARE_WORKERS, Skill.CLOUDFLARE_AI, Skill.CLOUDFLARE_KV, Skill.STABLE_DIFF, Skill.HONO, Skill.OPEN_API, Skill.ZOD, Skill.JIMP, Skill.REST_API],
      main_image_path : "/images/opti/projects/magic-eraser.webp",
      link : "https://magic-eraser.maximebodin.com",
      github : "https://github.com/maxbodin/magic-eraser-ui",
   },
   {
      description: 'Minimalist gallery for my film photography. Built with Next.js and Vercel Blob.',
      github: 'https://github.com/maxbodin/argentique',
      main_image_path: '/images/opti/projects/argentique.webp',
      link: 'https://argentique.maximebodin.com/',
      skills: [Skill.NEXT_JS, Skill.TAILWIND, Skill.SHADCN_UI],
      title: 'Argentique',
      date: '2025',
   },
   {
      description: 'Taxi racing game developed in 3 days for the 2025 GMTK Game Jam on the theme "Loop".\n\n' +
         'You play as a getaway driver picking up bank heist crews in a specific memorized order, while outrunning increasingly aggressive police cars.\n\n' +
         'Built from scratch in Unity, the game features procedurally generated tracks from splines with custom mesh building logic, a NavMesh-based police AI, a nitro timing mini-game with slow-motion effect, a dynamic wave-based heist system, and custom 3D assets modeled in Blender.',
      images_path: [
         'https://img.itch.zone/aW1nLzIyNTUyNjA1LnBuZw==/original/IqEhyL.png',
         'https://img.itch.zone/aW1nLzIyNTUzMzM0LnBuZw==/original/17DjsE.png',
         'https://img.itch.zone/aW1nLzIyNTUzNDMxLnBuZw==/original/XDqD1O.png',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTc5Ni5naWY=/original/Dqy6Co.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTc5NS5naWY=/original/EtO1FR.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTc5My5naWY=/original/SEGnx7.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTc5NC5naWY=/original/wxPV62.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTc5OS5naWY=/original/065ruS.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTc5OC5naWY=/original/YLXr%2BL.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTg1MC5naWY=/original/sXojwJ.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTg1MS5naWY=/original/NxRjtz.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTc5OC5naWY=/original/YLXr%2BL.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTg1MC5naWY=/original/sXojwJ.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTg1MS5naWY=/original/NxRjtz.gif',
         'https://img.itch.zone/aW1hZ2UvMzc1OTMxMC8yMjU4NTg1Mi5naWY=/original/%2B6j7RJ.gif',
      ],
      link: 'https://makzime.itch.io/taxilooper',
      skills: [Skill.UNITY, Skill.BLENDER, Skill.C_SHARP],
      title: 'Taxi Looper 🚕',
      date: '2025',
   },
   {
       title: 'BDA - Event Visuals',
       description: '3D visuals created in Blender and projected in the student house for tonus nights and cabaret events organized by IMT Atlantique\'s Bureau des Arts.',
      date: '2025',
      images_path: [
         '/images/opti/projects/bda-cybertonus.webp',
         '/images/opti/projects/bda-cabaret-casino.webp',
         '/images/opti/projects/bda-cabaret-circus.webp',
         '/images/opti/projects/bda-cabatonus.webp',
         '/images/opti/projects/bda-affiche.webp',
         '/images/opti/projects/bda-gigagauletonus.webp',
         '/images/opti/projects/bda-cabaret-summer.webp',
         '/videos/opti/projects/cabaret-summer-visuel-vp9.webm',
         '/images/opti/projects/bda-cabaret-abyss.webp',
      ],
      skills: [Skill.BLENDER],
   },
   {
      title: 'Sticker Ligne Verte',
      date: '2025',
      description: 'A series of stickers designed for the Ligne Verte tourist trail, featuring iconic landmarks of Nantes: the Cathedral, the Great Elephant of the Machines de l\'île, Graslin Theatre, the Yellow Titan Crane, and the LU Tower.',
      images_path: [
         '/images/art/ligne-verte-lieu-unique-bordered.png',
         '/images/art/ligne-verte-graslin-bordered.png',
         '/images/art/ligne-verte-grue-bordered.png',
         '/images/art/ligne-verte-elephant-bordered.png',
         '/images/art/ligne-verte-cathedrale-bordered.png',
      ],
      skills: [],
   },
   {
      description: 'Earth3D is an open-source 3D data visualization tool designed to display any type of geospatial data on a virtual globe, with the long-term goal of serving as an open alternative to Google Earth. The project is still under development.',
      github: 'https://github.com/maxbodin/earth3d',
      main_image_path: '/images/earth3D_001.webp',
      link: 'https://earth3d.vercel.app/',
      skills: [Skill.NEXT_JS, Skill.THREE_JS, Skill.TAILWIND, Skill.SHADCN_UI],
      title: 'Earth3D',
      date: '2024',
   },
   {
      description: 'Team project carried out as part of my 3rd year of a BUT in Computer Science at the IUT of La Rochelle. Design and implementation of an innovative application to help visit the heritage of La Rochelle. As the team\'s lead developer, I had the opportunity to guide my colleagues in adopting good development practices, thus contributing to the production of a robust and sustainable application.',
      main_image_path: '/videos/visite_patrimoine.webm',
      skills: [Skill.FLUTTER, Skill.SYMFONY, Skill.API_PLATFORM, Skill.REST_API, Skill.ORS, Skill.GESTION_PROJ],
      title: 'Visite Patrimoine',
      date: '2024',
   },
   {
      description: 'Proof of concept for a Retrieval-Augmented Generation (RAG) chatbot designed to retrieve and answer questions related to electrical safety and quality standards defined by the SéQuélec specifications ⚡️.\n' +
         'The project could not be released publicly due to the proprietary copyright of the SéQuélec documents. However, the POC was functional and began evolving toward a more generic RAG system capable of ingesting and querying user-provided documents in real time.\n' +
         'The project would benefit from a full cleanup and modernization using current RAG and LLM tooling.',
      main_image_path: '',
      github: 'https://github.com/maxbodin/ragelec',
      skills: [Skill.IA, Skill.NEXT_JS],
      title: 'RagÉlec ⚡',
      date: '2024',
   },
   {
      description: 'Web application displaying Olympic Games rankings, medal counts, and event results 🏅.\n' +
         'Features a user-friendly interface with search and filter options, historical data access, and a mobile-friendly design.\n' +
         'The project was never completed and remains a work in progress.',
      main_image_path: '',
      github: 'https://github.com/maxbodin/jo',
      skills: [],
      title: 'jo',
      date: '2024',
   },
   {
      description: 'Interactive map built with Leaflet that tracks the bus stops my friend Bastien and I have visited in La Rochelle. As we aim to explore all the bus stops in the city, the map highlights our journey and progress.',
      main_image_path: '/images/opti/projects/bus-stop-explorer.webp',
      github: 'https://github.com/maxbodin/bus-stop-explorer',
      link:'https://bus-stop-explorer.maximebodin.com/',
      skills: [Skill.JAVASCRIPT],
      title: 'Bus Stop Explorer 🚌',
      date: '2024',
   },
   {
      description: 'Update of the game Island Survivors, initially created during the GMTK 2023 Game Jam.',
      main_image_path: '/videos/island_survivors_v2.webm',
      link: 'https://makzime.itch.io/island-survivors-chaos-upgrade',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GITLAB, Skill.GESTION_PROJ, Skill.GAME_DESIGN, Skill.GIMP, Skill.PAINT_NET],
      title: 'Island Survivors V2',
      date: '2023',
   },
   {
      description: 'Creation of an acquisition system composed of an ESP32 connected to temperature, humidity, and CO2 sensors. Design and development of the program to retrieve data from the sensors and send this data to an API, in C++. Creation of a React web application serving as a diagnostic tool for the air quality sensors installed within the IUT of La Rochelle. The application allows users to consult the temperatures of the rooms and receive eco-advice based on the air quality, but also allows technicians to configure the acquisition and sending of data from an interface. Optimization of the system\'s consumption.',
      main_image_path: '/videos/smart_campus_iot.webm',
      skills: [Skill.HTML, Skill.PHP, Skill.SYMFONY, Skill.TAILWIND, Skill.CPP, Skill.TRAV_EQUIP, Skill.GIT, Skill.AGILE, Skill.DOCKER, Skill.SQL, Skill.PHPUNIT],
      title: 'IOT Smart Campus',
      date: '2023',
   },
   {
      description: 'Design and creation of a 2D video game, in C# with Unity.',
      github: 'https://github.com/maxkzime/WildHatWest',
      main_image_path: '/images/wildhatwest.webp',
      link: 'https://makzime.itch.io/wild-hat-west',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GAME_DESIGN, Skill.PLASTIC_SCM, Skill.RESOLUTION_PROB, Skill.GESTION_PROJ],
      title: 'Wild Hat West',
      date: '2022',
   },
   {
      description: 'Team design and creation of a game inspired by Street Fighter 2, developed in C++ with the Qt graphics framework. Among other things, I designed a hitbox system and a key customization system.',
      main_image_path: '/videos/iutfighter.webm',
      skills: [Skill.TRAV_EQUIP, Skill.GAME_DESIGN, Skill.CPP, Skill.QT, Skill.POO, Skill.GESTION_PROJ, Skill.GIT, Skill.KANBAN],
      title: 'IUT FIGHTER',
      date: '2022',
   },
]