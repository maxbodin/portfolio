import { Card, CardContent } from '@/components/ui/card'
import * as React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { GithubIcon, SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Experience } from '@/interfaces/experience'
import { Projet } from '@/interfaces/projet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getSkillColor, Skill } from '@/functions/getSkillColor'

export const CarouselItemWithHover = ({ item }: { item: Projet | Experience }) => {
   const [hovered, setHovered] = useState<boolean>(false)

   return (
      <div
         className="p-1 relative"
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
      >
         <Card className="w-full h-full rounded-xl overflow-hidden relative">
            <CardContent className="flex flex-col items-center justify-center w-full h-full p-0 relative">
               <img
                  src={item.image_path}
                  title={item.title}
                  alt={item.title}
                  className={`w-full h-full object-cover rounded-t-xl transition duration-300 ${hovered ? 'brightness-50' : ''}`}
               />
               {hovered && (
                  <div className="absolute top-20 left-0 right-0 flex items-center justify-center space-x-4">
                     {'github' in item && item.github && <Button variant="outline" size="icon" asChild>
                        <Link href={item.github}><GithubIcon className="h-4 w-4" /></Link>
                     </Button>}
                     {item.link && <Button variant="outline" size="icon" asChild>
                        <Link href={item.link}><SquareArrowOutUpRight className="h-4 w-4" /></Link>
                     </Button>}
                  </div>
               )}
               <Accordion type="single" collapsible className="px-8">
                  <AccordionItem value={item.title}>
                     <AccordionTrigger>
                        <div className="flex flex-col">
                           <p className="font-semibold text-base text-justify pr-11">{item.title}</p>
                           {'date' in item && <p className="py-2 text-xs text-gray-600 text-justify">{item.date}</p>}
                        </div>
                     </AccordionTrigger>
                     <AccordionContent>
                        <p className="pb-2 text-justify md:text-sm text-xs">{item.description}</p>
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
               <div className="flex flex-wrap mt-2 p-4">
                  {item.skills.map((skill: Skill, index: number) => (
                     <div className="p-1" key={index}>
                        <Badge key={index} variant="outline" className="p-1 px-2 text-center"
                               style={{ color: getSkillColor(skill) }}>
                           {skill}
                        </Badge>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
   )
}