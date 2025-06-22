'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import React, { useTransition } from 'react'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
   const router = useRouter()
   const pathname = usePathname()

   const [isPending, startTransition] = useTransition()

   const handleSwitchChange = (checked: boolean) => {
      startTransition(() => {
         if (checked && pathname !== '/space') {
            router.push('/space')
         } else if (!checked && pathname !== '/') {
            router.push('/')
         }
      })
   }

   return (
      <div className="relative min-h-screen">
         <div className="absolute top-4 left-4 z-50">
            <Switch
               onCheckedChange={handleSwitchChange}
               checked={pathname === '/space'}
               disabled={isPending}
               className="bg-primary"
            />
         </div>
         {children}
      </div>
   )
}
