import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import CarouselItemWithHover from '@/components/custom/carouseltemWithHover'
import { formationsCertificationsItems } from '@/data/formCertif'
import { WorkDetails } from '@/interfaces/workDetails'

export default function FormCertif() {
   return (
      <section id="formationsCertifications" className="pt-16">
         <h2 className="text-2xl pb-4">Formations & Certifications 🎓</h2>
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full max-w-full"
         >
            <CarouselContent>
               {formationsCertificationsItems.map((formationsCertification: WorkDetails, index: number) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                     <CarouselItemWithHover item={formationsCertification} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </section>
   )
}