import * as React from 'react'
import {
   NavigationMenu,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export default function NavBar() {
   return (
      <div
         className="flex flex-col items-center md:flex-row md:items-start md:justify-between sticky top-0 md:right-0 md:w-auto md:fixed z-50 w-full sm:px-4">
         <NavigationMenu
            className="flex flex-wrap md:flex-row md:items-center bg-background p-2 rounded-b-2xl w-full md:w-auto">
            <NavigationMenuList className="flex flex-wrap w-full md:w-auto">
               <NavigationMenuItem>
                  <NavigationMenuLink href="#whoami" className={navigationMenuTriggerStyle()}>whoami 👾
                  </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                  <NavigationMenuLink href="#experiences" className={navigationMenuTriggerStyle()}>Expériences 🛠
                  </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                  <NavigationMenuLink href="#projects" className={navigationMenuTriggerStyle()}>Projets 💡
                  </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                  <NavigationMenuLink href="#3d" className={navigationMenuTriggerStyle()}>3D 🎨
                  </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                  <NavigationMenuLink href="#events" className={navigationMenuTriggerStyle()}>Évènements 🏆
                  </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                  <NavigationMenuLink href="#formationsCertifications" className={navigationMenuTriggerStyle()}>Formations
                     & Certifications 🎓
                  </NavigationMenuLink>
               </NavigationMenuItem>
               {/* TODO
          <NavigationMenuItem>
            <NavigationMenuLink href="#youtube" className={navigationMenuTriggerStyle()}>
              Youtube 🎬
            </NavigationMenuLink>
          </NavigationMenuItem>*/}
               {/* TODO
          <NavigationMenuItem>
            <NavigationMenuLink href="#goals" className={navigationMenuTriggerStyle()}>
              Objectifs 🎯
            </NavigationMenuLink>
          </NavigationMenuItem>*/}
            </NavigationMenuList>
         </NavigationMenu>
      </div>
   )
}