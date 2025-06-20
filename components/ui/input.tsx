// --- START OF FILE components/ui/input.tsx ---

import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
   ({ className, type, ...props }, ref) => {
      return (
         <input
            type={type}
            className={cn(
               // Base styles
               "flex h-10 w-full rounded-md px-3 py-2 text-sm",
               // Glass morphism effect
               "bg-black/10 backdrop-blur-sm border border-white/20",
               // Placeholder styles
               "placeholder:text-neutral-100",
               // Focus styles
               "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
               // Disabled styles
               "disabled:cursor-not-allowed disabled:opacity-50",
               className
            )}
            ref={ref}
            {...props}
         />
      )
   }
)
Input.displayName = "Input"

export { Input }