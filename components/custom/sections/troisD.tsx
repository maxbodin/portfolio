import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { InstagramIcon } from 'lucide-react'
import { troisDItems } from '@/data/troisD'
import { WorkDetails } from '@/interfaces/workDetails'


export default function TroisD() {
   // Helper function to check for video extensions.
   const isVideo = (path: string) => path.endsWith('.mp4') || path.endsWith('.webm');

   return (
      <section id="3d">
         <h2 className="text-2xl pt-8 pb-4">3D 🎨</h2>
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
                                    {isVideo(item.image_path) ? (
                                       <video
                                          src={item.image_path}
                                          title={item.title}
                                          autoPlay
                                          loop
                                          muted
                                          playsInline
                                          className="w-full h-full object-cover rounded-xl"
                                       />
                                    ) : (
                                       <img
                                          src={item.image_path}
                                          alt={item.title}
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

         <div className="pt-4">
            <Button variant="outline" asChild>
               <Link href="https://www.instagram.com/maximejustevie/">
                  <InstagramIcon className="mr-2 h-4 w-4 text-[#E1306C]" /> Voir sur Instagram
               </Link>
            </Button>
         </div>
      </section>
   )
}