import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { eventsItems } from '@/data/events'
import CarouselItemWithHover from '@/components/custom/carouseltemWithHover'
import { WorkDetails } from '@/interfaces/workDetails'

export default function Events() {
   return (
      <section id="events" className="pt-16">
         <h2 className="text-2xl pb-4">Évènements 🏆</h2>
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full max-w-full"
         >
            <CarouselContent>
               {eventsItems.map((event: WorkDetails, index: number) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                     <CarouselItemWithHover item={event} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </section>
   )
}