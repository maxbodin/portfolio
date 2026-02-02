import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { experiencesItems } from '@/data/experiences'
import CarouselItemWithHover from '@/components/custom/carouseltemWithHover'
import { WorkDetails } from '@/interfaces/workDetails'


export default function Experiences() {
   return (
      <section id="experiences" className="pt-16">
         <h2 className="text-2xl pb-4">Experiences 🛠️</h2>
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full max-w-full"
         >
            <CarouselContent>
               {experiencesItems.map((experience: WorkDetails, index: number) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                     <CarouselItemWithHover item={experience} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </section>
   )
}