'use client'
import * as React from 'react'
import { ContactButton } from '@/components/custom/contactButton'
import { Projects } from '@/components/custom/sections/projects'
import { TroisD } from '@/components/custom/sections/troisD'
import { Whoami } from '@/components/custom/sections/whoami'
import { Experiences } from '@/components/custom/sections/experiences'
import { Events } from '@/components/custom/sections/events'
import { NavBar } from '@/components/custom/navBar'
import { Footer } from '@/components/custom/footer'


export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-between pt-20">
         <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <NavBar />
            <div className="flex flex-col w-full px-16 lg:px-20">
               <Whoami />
               <Experiences />
               <Projects />
               <TroisD />
               <Events />
               {/* TODO <Goals />*/}
               <ContactButton />
               <Footer />
            </div>
         </div>
      </main>
   )
}

// TODO Youtube part : gets videos from YouTube API