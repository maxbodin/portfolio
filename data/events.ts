import { Skill } from '@/functions/getSkillColor'
import { WorkDetails } from '@/interfaces/workDetails'

export const eventsItems: WorkDetails[] = [
   {
      date: '2024',
      description: 'Participated as a team in the #24hDeLinfo, a national competition for French IUTs. The contest consisted of three 8-hour challenges. Our team proudly finished 8th out of 34 teams.',
      main_image_path: '/images/logo2024.webp',
      link: 'https://24hinfo.iut.fr',
      skills: [Skill.ALGO_PROG, Skill.DEV_WEB, Skill.SEC],
      title: '24h de l\'Info 2024',
   },
   {
      date: '2023',
      description: 'Team participation in the Nuit de l\'Info 2023 at the CESI campus in La Rochelle. The goal of this overnight hackathon was to create a website on the theme of climate change 🌎, aiming to distinguish fact from fiction. We developed a game where the user manages the health of their planet through various choices.',
      main_image_path: '/images/mylittleplanet.jpeg',
      link: 'https://nuit-info-2024.vercel.app',
      skills: [Skill.REACT, Skill.THREE_JS, Skill.HLSL, Skill.COM],
      title: 'Nuit de l\'info 2023',
   },
   {
      date: '2023',
      description: 'During the GMTK Game Jam 2023, we created the game "Island Survivors" as a team of two.',
      main_image_path: '/images/island_survivors.png',
      link: 'https://makzime.itch.io/island-survivors-chaos-upgrade',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GITLAB, Skill.GESTION_PROJ, Skill.GIMP, Skill.PAINT_NET],
      title: 'GMTK Game Jam 2023',
   },
   {
      date: '2022',
      description: 'Participated as a team in the Nuit de l\'Info 2022 at the CESI campus in La Rochelle. The goal was to create a website promoting access to relevant and appropriate information on sexual health. My role was to develop a serious game within our site. We won first place in the "Easter Egg" challenge, sponsored by the company Code-Troopers.',
      main_image_path: '/images/n2i_2022.jpg',
      link: 'https://www.nuitdelinfo.com',
      skills: [Skill.HTML, Skill.CSS, Skill.COM],
      title: 'Nuit de l\'info 2022',
   },
]