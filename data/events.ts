import { Skill } from '@/functions/getSkillColor'
import { WorkDetails } from '@/interfaces/workDetails'

export const eventsItems: WorkDetails[] = [
   {
      title: '24h de l\'Info 2024',
      description: 'Participation en équipe au #24hDeLinfo des IUT de France ! Concours composé de trois épreuves, chacune d’une durée de 8 heures. Nous avons fièrement terminé 8ème sur 34 équipes.',
      link: 'https://24hinfo.iut.fr',
      image_path: '/images/logo2024.png',
      skills: [Skill.ALGO_PROG, Skill.DEV_WEB, Skill.SEC],
   },
   {
      title: 'Nuit de l\'info 2023',
      description: 'Participation en équipe à la Nuit de l\'Info 2023 sur le campus CESI de La Rochelle. Le but de cette nuit de développement était de créer un site web sur le thème du changement climatique 🌎, afin de démystifier le vrai du faux. Nous avons développer un jeu dans lequel l\'utilisateur peut gérer l\'état de sa planète via des choix.',
      link: 'https://nuit-info-2024.vercel.app',
      image_path: '/images/mylittleplanet.jpeg',
      skills: [Skill.REACT, Skill.THREE_JS, Skill.HLSL, Skill.COM],
   },
   {
      title: 'Game Jam GMTK 2023',
      description: 'Lors de la game jam GMTK 2O23, nous avons réalisé le jeu Island Survivors, en binôme.',
      link: 'https://makzime.itch.io/island-survivors-chaos-upgrade',
      image_path: '/images/island_survivors.png',
      skills: [Skill.UNITY, Skill.C_SHARP, Skill.GITLAB, Skill.GESTION_PROJ, Skill.GIMP, Skill.PAINT_NET],
   },
   {
      title: 'Nuit de l\'info 2022',
      description: 'Participation en équipe à la Nuit de l\'Info 2022 sur le campus CESI de La Rochelle. Le but de cette nuit de développement était de créer un site web permettant de favoriser l’accès à une information pertinente et adaptée sur la santé sexuelle. Mon rôle a été de développé un serious game au sein de notre site. Nous avons obtenu la première place au défi "Easter egg", proposé par l\'entreprise Code-Troopers.',
      image_path: '/images/n2i_2022.jpg',
      link: 'https://www.nuitdelinfo.com',
      skills: [Skill.HTML, Skill.CSS, Skill.COM],
   },
]
