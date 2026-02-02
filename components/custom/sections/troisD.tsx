import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { troisDItems } from '@/data/troisD'
import { WorkDetails } from '@/interfaces/workDetails'
import { isVideo } from '@/app/space/Work'


export default function TroisD() {
   return (
      <section id="3d">
         <h2 className="text-2xl pt-8 pb-4">3D and creative coding 🎨</h2>
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full max-w-full"
         >
            <CarouselContent>
               {troisDItems
                  .filter(item => !item.space_only)
                  .map((item: WorkDetails, index: number) => (
                     <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                           <Card className="w-full h-full rounded-xl">
                              <CardContent className="flex items-center justify-center w-full h-full p-0">
                                 <div className="w-full h-full rounded-xl overflow-hidden">
                                    {/* Conditionally render video or image. */}
                                    {item.main_image_path && isVideo(item.main_image_path) ? (
                                       <video
                                          src={item.main_image_path}
                                          title={item.title}
                                          autoPlay
                                          loop
                                          muted
                                          playsInline
                                          className="w-full h-full object-cover rounded-xl"
                                       />
                                    ) : (
                                       // eslint-disable-next-line @next/next/no-img-element
                                       <img
                                          src={item.main_image_path}
                                          alt={item.title}
                                          title={item.title}
                                          className="w-full h-full object-cover rounded-xl"
                                       />
                                    )}
                                 </div>
                              </CardContent>
                           </Card>
                        </div>
                     </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </section>
   )
}