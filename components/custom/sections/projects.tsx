import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { projectsItems } from '@/data/projects'
import CarouselItemWithHover from '@/components/custom/carouseltemWithHover'
import { WorkDetails } from '@/interfaces/workDetails'


export default function Projects() {
   return (
      <section id="projects" className="pt-16">
         <h2 className="text-2xl pb-4">Projets 💡</h2>
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full max-w-full"
         >
            <CarouselContent>
               {projectsItems.map((project: WorkDetails, index: number) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                     <CarouselItemWithHover item={project} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </section>
   )
}