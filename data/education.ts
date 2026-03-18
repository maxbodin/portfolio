import { WorkDetails } from '@/interfaces/workDetails'
import { Skill } from '@/functions/getSkillColor'

export const educationItems: WorkDetails[] = [
   {
      date: '2024-2027',
      description:
         'Activities and associations: Member of the communications division of the arts council (Bureau Des Arts - BDA).',
      main_image_path: '/images/imt.png',
      link: 'https://www.imt-atlantique.fr/fr/formation/ingenieur-apprentissage/ingenierie-logicielle',
      skills: [],
      title: 'Engineering Degree in Computer Science from École Nationale Supérieure Mines-Télécom Atlantique (IMT Atlantique)',
      related_works: [
         {
            title: 'IMT-FIL-A2-Renardo-Rscan',
            description: 'This project was carried out for the startup Renardo. Working as part of a team, we designed and developed a mobile application for real-time visualization of electromagnetic fields captured by a proprietary electromagnetic imaging sensor intended for industrial non-destructive inspection. The application connects to the sensor via USB, performs signal pre-processing, interpolates sensor data, and fuses the resulting electromagnetic field visualization with the smartphone camera feed. The app supports photo capture and real-time visualization. The project will be showcased at VivaTech 2026.',
            date: '2026',
            skills: [
               Skill.KOTLIN,
               Skill.TRAV_EQUIP,
            ],
            main_image_path: '/images/opti/IMT-FIL-A2-Renardo-Rscan.webp',
         },
         {
            title: 'IMT-FIL-A2-KOTLIN-MEALAPP',
            github: 'https://github.com/maxbodin/IMT-FIL-A2-KOTLIN-MEALAPP',
            description: 'Technical lab assignment at IMT Atlantique demonstrating modern Android development practices. The project uses Clean Architecture, MVI (Model-View-Intent), and Jetpack Compose to fetch and display meal categories and meals from a REST API, ensuring scalability and unidirectional data flow.',
            date: '2026',
            skills: [Skill.KOTLIN, Skill.MVI],
            images_path: [
               'https://github.com/maxbodin/IMT-FIL-A2-KOTLIN-MEALAPP/blob/main/screenshots/IMT-FIL-A2-KOTLIN-MEALAPP-screenshot_categories.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-KOTLIN-MEALAPP/blob/main/screenshots/IMT-FIL-A2-KOTLIN-MEALAPP-screenshot_details.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-KOTLIN-MEALAPP/blob/main/screenshots/IMT-FIL-A2-KOTLIN-MEALAPP-screenshot_meals.webp?raw=true',
            ],
         },
         {
            description: 'Series of Scala 3 practical assignments completed at IMT Atlantique, covering functional programming, object-oriented design, and concurrent algorithms.\n' +
               'The exercises progressively introduce Scala 3 fundamentals: immutable data structures and case classes (TP1 — a `Rational` number system with GCD simplification), OOP patterns with traits and inheritance (TP2), higher-order functions, tail recursion and call-by-name parameters (TP3), and enum implementations in both OO and FP styles (TP4).\n' +
               'The final assessment, **AmazingMaze**, is a full binary-tree maze explorer implementing three traversal strategies: simple recursion returning a functional trace, mutable accumulation via `ListBuffer`, and a concurrent depth-first traversal using an explicit work stack and a three-phase state machine (`UnExplored` → `PartiallyExplored` → `Explored`), serving as a foundation for work-stealing scheduler patterns.',
            main_image_path: '',
            github: 'https://github.com/maxbodin/IMT-FIL-A2-SCALA-TP',
            skills: [Skill.SCALA],
            title: 'IMT-FIL-A2-SCALA-TP',
            date: '2026',
         },
         {
            title: 'IMT-FIL-A2-pokedex',
            github: 'https://github.com/maxbodin/IMT-FIL-A2-pokedex',
            description: 'Developed as a lab assignment for IMT Atlantique, this Flutter Pokedex utilizes the PokebuildAPI with a focus on optimized data handling, type-safe JSON sanitization, and dynamic UI.',
            date: '2026',
            skills: [Skill.FLUTTER],
            images_path: [
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-dracaufeu_details.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-draco_search.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-gen_filter_results.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-gen_filters.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-guess.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-guess_fail.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-guess_win.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-list.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-melofee_details.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-mewtwo_details.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-type_filter_results.webp?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-pokedex/blob/main/screenshots/IMT-FIL-A2-pokedex-type_filters.webp?raw=true',
            ],
         },
         {
            title: 'IMT-FIL-A2-spacex_app',
            github: 'https://github.com/maxbodin/IMT-FIL-A2-spacex_app',
            description: 'Developed as a lab assignment for IMT Atlantique, this Flutter application lets space enthusiasts explore the full history of SpaceX launches. Browse past and upcoming missions, dive into technical details about rockets, payloads, and launchpads, and save your favorite launches for quick access.',
            date: '2026',
            skills: [Skill.FLUTTER],
            images_path: [
               'https://github.com/maxbodin/IMT-FIL-A2-spacex_app/raw/main/screenshots/homelist.png?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-spacex_app/raw/main/screenshots/favorites.png?raw=true',
               'https://github.com/maxbodin/IMT-FIL-A2-spacex_app/raw/main/screenshots/gallery_details_1.png?raw=true'
            ],
         },
         {
            title: 'IMT-FIL-A1-Graphe_FISA',
            github: 'https://github.com/maxbodin/IMT-FIL-A1-Graphe_FISA/tree/main',
            description: 'Lab assignment at IMT Atlantique involving the implementation of graph data structures and classical graph algorithms, including Dijkstra’s shortest path algorithm and Prim’s minimum spanning tree algorithm.',
            date: '2025',
            skills: [Skill.JAVA, Skill.ALGO_PROG],
         },
      ],
   },
   {
      date: '2021-2024',
      description: 'Specialization in "Application development: Architecture design, Development, and Validation".',
      main_image_path: '/images/iut-but-info.webp',
      link: 'https://www.iut-larochelle.fr/formations/departement-informatique/parcours-a-realisation-dapplications-conception-developpement-validation/',
      skills: [],
      title: 'University Bachelor of Technology (BUT) in Computer Science, IUT La Rochelle',
   },
]