'use client'
import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { WorkDetails } from '@/interfaces/workDetails'
import { GithubIcon, SquareArrowOutUpRight } from 'lucide-react'
import SkillsBadgeList from '@/components/custom/skillsBadgeList'

const isVideo = (path: string) => path.endsWith('.mp4') || path.endsWith('.webm')

export default function WorkFolder({ item }: { item: WorkDetails }) {
   return (
      <Accordion type="single" collapsible className="w-full">
         <AccordionItem value={item.title}>
            <AccordionTrigger className="pl-4">
               <div className="flex items-center justify-between w-full">
                  <span className="text-left font-semibold">{item.title}</span>


                  <div className="flex items-center gap-2 pr-4" onClick={(e) => e.stopPropagation()}>
                     {item.github && (
                        <Button variant="outline" size="icon" asChild>
                           <Link href={item.github} target="_blank" rel="noopener noreferrer">
                              <GithubIcon className="h-4 w-4" />
                           </Link>
                        </Button>
                     )}
                     {item.link && (
                        <Button variant="outline" size="icon" asChild>
                           <Link href={item.link} target="_blank" rel="noopener noreferrer">
                              <SquareArrowOutUpRight className="h-4 w-4" />
                           </Link>
                        </Button>
                     )}
                  </div>
               </div>
            </AccordionTrigger>

            <AccordionContent>
               <div className="p-4 pt-2 flex flex-col md:flex-row gap-6 md:gap-8 items-start">

                  <div className="w-full md:w-1/4 flex-shrink-0">
                     {isVideo(item.image_path) ? (
                        <video
                           src={item.image_path}
                           title={item.title}
                           autoPlay
                           loop
                           muted
                           playsInline
                           className="w-full h-auto object-cover rounded-md"
                        />
                     ) : (
                        <Image
                           width={400}
                           height={300}
                           src={item.image_path}
                           title={item.title}
                           alt={item.title}
                           className="w-full h-auto object-cover rounded-md"
                        />
                     )}
                  </div>

                  <div className="flex-1">
                     <p className="text-md whitespace-break-spaces">
                        {item.description}
                     </p>

                     <SkillsBadgeList skills={item.skills} />
                  </div>
               </div>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}