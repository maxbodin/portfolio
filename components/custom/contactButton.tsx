import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export const ContactButton = () => (
   <div className="flex flex-col items-center pt-60">
      <Button variant="outline" asChild>
         <Link href="mailto:wip@example.com">
            <Mail className="mr-2 h-4 w-4" /> J’ai envie de discuter !
         </Link>
      </Button>
   </div>
);