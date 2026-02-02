'use client'
import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { WorkDetails } from '@/interfaces/workDetails'
import { GithubIcon, SquareArrowOutUpRight } from 'lucide-react'
import SkillsBadgeList from '@/components/custom/skillsBadgeList'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { isVideo } from '@/app/space/Work'

export default function WorkFolder({ item }: { item: WorkDetails }) {
   const hasGallery = item.images_path && item.images_path.length > 0

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
               {hasGallery ? (
                  <div className="p-4 pt-2 flex flex-col gap-4">
                     <Carousel>
                        <CarouselContent>
                           {item.images_path?.map((imageSrc, index) => (
                              <CarouselItem key={index} className="basis-1/2 md:basis-1/4">
                                 <Image
                                    width={200}
                                    height={100}
                                    src={imageSrc}
                                    title={item.title}
                                    alt={item.title}
                                    className="w-full h-48 object-contain rounded-md"
                                 />
                              </CarouselItem>
                           ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                     </Carousel>
                     <div className="flex-1">
                        <p className="text-md whitespace-break-spaces">
                           {item.description}
                        </p>
                        <SkillsBadgeList skills={item.skills} />
                     </div>
                  </div>
               ) : (
                  <div className="p-4 pt-2 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                     {item.main_image_path && (
                        <div className="w-full md:w-1/4 flex-shrink-0">
                           {isVideo(item.main_image_path) ? (
                              <video
                                 src={item.main_image_path}
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
                                 src={item.main_image_path}
                                 title={item.title}
                                 alt={item.title}
                                 className="w-full h-auto object-cover rounded-md"
                              />
                           )}
                        </div>
                     )}

                     <div className="flex-1">
                        <p className="text-md whitespace-break-spaces">
                           {item.description}
                        </p>
                        <SkillsBadgeList skills={item.skills} />
                     </div>
                  </div>
               )}
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}