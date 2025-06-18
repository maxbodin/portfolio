"use client";

import { usePathname, useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const pathname = usePathname();

   const handleSwitchChange = (checked: boolean) => {
      if (checked && pathname !== '/space') {
         router.push('/space');
      } else if (!checked && pathname !== '/') {
         router.push('/');
      }
   };

   return (
      <div className="relative min-h-screen">
         <div className="absolute top-4 left-4 z-50">
            <Switch
               onCheckedChange={handleSwitchChange}
               checked={pathname === '/space'}
               className="bg-primary"
            />
         </div>
         {children}
      </div>
   );
}
