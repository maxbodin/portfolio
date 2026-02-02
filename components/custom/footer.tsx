import * as React from 'react'

export default function Footer() {
   return (
      <footer className="w-full flex justify-center">
         <p className="text-sm pt-16 text-gray-500 pb-8 text-center">
            © {new Date().getFullYear()} Maxime Bodin, All rights reserved.
         </p>
      </footer>
   )
}