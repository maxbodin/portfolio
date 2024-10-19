import * as React from 'react'
import NavBar from '@/components/custom/navBar'
import Whoami from '@/components/custom/sections/whoami'
import Experiences from '@/components/custom/sections/experiences'
import Footer from '@/components/custom/footer'
import Projects from '@/components/custom/sections/projects'
import TroisD from '@/components/custom/sections/troisD'
import Events from '@/components/custom/sections/events'
import ContactButton from '@/components/custom/contactButton'
import Certifications from '@/components/custom/sections/certifications'


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
               <Certifications />
               <ContactButton />
               <Footer />
               {/* TODO <Goals /> */}
            </div>
         </div>
      </main>
   )
}

// TODO Youtube part : gets videos from YouTube API