import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { troisDItems } from '@/data/troisD'
import { WorkDetails } from '@/interfaces/workDetails'
import { isVideo } from '@/app/space/Work'
import ImageWithFallback from '@/components/custom/imageWithFallback'
import Video from '@/components/custom/video'


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
                                 {item.main_image_path &&
                                 <div className="w-full h-full rounded-xl overflow-hidden">
                                    {/* Conditionally render video or image. */}
                                    { isVideo(item.main_image_path) ? (
                                       <Video src={item.main_image_path}
                                              title={item.title}
                                              className="w-full h-full object-cover rounded-xl"/>
                                    ) : (
                                       <ImageWithFallback
                                          width={400}
                                          height={300}
                                          src={item.main_image_path}
                                          alt={item.title}
                                          title={item.title}
                                          className="w-full h-full object-cover rounded-xl"
                                       />
                                    )}
                                 </div>}
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