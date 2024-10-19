import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import CarouselItemWithHover from '@/components/custom/carouseltemWithHover'
import { Certification } from '@/interfaces/certification'
import { certificationsItems } from '@/data/certifications'

export default function Certifications() {
   return (
      <section id="certifications" className="pt-16">
         <h2 className="text-2xl pb-4">Certifications 🎓</h2>
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full max-w-full"
         >
            <CarouselContent>
               {certificationsItems.map((certification: Certification, index: number) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                     <CarouselItemWithHover item={certification} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </section>
   )
}