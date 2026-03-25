import Whoami from '@/components/custom/sections/whoami'
import Experiences from '@/components/custom/sections/experiences'
import Footer from '@/components/custom/footer'
import TroisD from '@/components/custom/sections/troisD'
import ContactButton from '@/components/custom/contactButton'
import NavBar from '@/components/custom/navBar'
import YearlyWorksFolders from '@/components/custom/yearlyWorksFolders'
import { educationItems } from '@/data/education'
import { eventsItems } from '@/data/events'
import { certificationsItems } from '@/data/certifications'
import { projectsItems } from '@/data/projects'

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-between pt-8">
         <div className="z-10 w-full max-w-7xl items-center justify-between lg:flex">
            <NavBar />
            <div className="flex flex-col w-full md:px-8 px-4 lg:px-20">
               <Whoami />
               <Experiences />
               <YearlyWorksFolders items={educationItems} title={'Education 🎓'} anchor={'education'} />
               <YearlyWorksFolders items={projectsItems} title={'Projects 💡'} anchor={'projects'} />
               <TroisD />
               <YearlyWorksFolders items={eventsItems} title={'Events 🏆'} anchor={'events'} />
               <YearlyWorksFolders items={certificationsItems} title={'Certifications 📜'} anchor={'certifications'} />
               <ContactButton />
               <Footer />
            </div>
         </div>
      </main>
   )
}