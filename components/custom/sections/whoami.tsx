/* eslint-disable max-len */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GithubIcon, LinkedinIcon, Rocket } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ItchIoIcon } from '@/components/custom/icons/ItchIoIcon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

const tooltipDelayDuration: number = 100

const wordsEn: string = `Passionate and self-taught in computer science, I am currently a FullStack Developer Apprentice at Nextlane, pursuing a Software Engineering degree at IMT Atlantique.

Over the years, I have developed strong skills in software design, development, and validation, with experience in:

- Web and mobile application development
- Software development using Python & C++
- 2D & 3D game development with Unity, Godot
- Creative coding and generative art with Blender and Touchdesigner

After completing a BUT in Computer Science at the IUT of La Rochelle and a successful apprenticeship at Enedis, I am now continuing my journey at Nextlane.
I enjoy designing and creating innovative projects and learning new knowledge by bringing them to life.

Interested in machine learning, information retrieval, natural language processing, mobile development, distributed and parallel systems, networking and developing large software systems.

Motivated, versatile, and eager to take on new challenges, I would love to connect if you have an opportunity to innovate or collaborate on exciting projects! 🚀`


export default function Whoami() {
   return (
      <section id="whoami" className="pt-8 flex flex-col lg:flex-row items-start space-x-4">
         <Avatar className="flex-shrink-0">
            <AvatarImage src="/images/id.webp" />
            <AvatarFallback>🤓</AvatarFallback>
         </Avatar>
         <div className="flex flex-col space-y-2 pt-4">
            <h1 className="text-5xl font-semibold">@MaxBodin</h1>
            <Badge className="p-1 px-2 bg-purple-100 w-fit hover:bg-purple-400 hover:cursor-pointer">
               <Link className="flex flex-row " href="mailto:maxbod.contact@gmail.com">
                  <Rocket className="h-4 text-purple-800" />
                  <p className="px-1 text-purple-700">Working at Nextlane !</p>
               </Link>
            </Badge>
            <h2><b>Seeking for a 12-week international internship (May – Sept 2026).</b></h2>
            <TextGenerateEffect duration={0.1} filter={true} words={wordsEn}
                                className="text-xs sm:text-sm" />
            <div className="flex flex-row space-x-2 pt-4">
               <TooltipProvider delayDuration={tooltipDelayDuration}>
                  <Tooltip>
                     <TooltipTrigger>
                        <Button variant="outline" size="icon" asChild>
                           <Link href="https://github.com/maxbodin/"><GithubIcon className="h-4 w-4" /></Link>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom">
                        Github
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
               <TooltipProvider delayDuration={tooltipDelayDuration}>
                  <Tooltip>
                     <TooltipTrigger>
                        <Button variant="outline" size="icon" asChild>
                           <Link href="https://www.linkedin.com/in/maxime-bodin-dev/">
                              <LinkedinIcon className="h-4 w-4 text-blue-800" />
                           </Link>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom">
                        <p className="text-blue-800">Linkedin</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
               <TooltipProvider delayDuration={tooltipDelayDuration}>
                  <Tooltip>
                     <TooltipTrigger>
                        <Button variant="outline" size="icon" asChild>
                           <Link href="https://makzime.itch.io">
                              <ItchIoIcon />
                           </Link>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom">
                        <p className="text-[#fa5c5c]">Itch.io</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
               <TooltipProvider delayDuration={tooltipDelayDuration}>
                  <Tooltip>
                     <TooltipTrigger className="pl-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-gray-300 hover:bg-gray-400" asChild>
                           <Link href="https://github.com/maxkzime"><GithubIcon className="h-4 w-4" /></Link>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom" className="bg-gray-300">
                        Ancien Github
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>
         </div>
      </section>
   )
}