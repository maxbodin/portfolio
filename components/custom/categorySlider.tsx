'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface CategorySliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
   labels: string[];
}

const CategorySlider = React.forwardRef<
   React.ElementRef<typeof SliderPrimitive.Root>,
   CategorySliderProps
>(({ className, labels, ...props }, ref) => (
   <div className="relative py-4">
      {/* Container for the labels, positioned above the slider track. */}
      <div className="absolute top-0 left-0 right-0 flex justify-between">
         {labels.map((label, i) => (
            <div
               key={label}
               className="absolute text-center"
               style={{
                  left: `${(i / (labels.length - 1)) * 100}%`,
                  transform: 'translateX(-50%)',
               }}
            >
               <span className="text-[8px] sm:text-xs text-neutral-600 whitespace-nowrap">{label}</span>
            </div>
         ))}
      </div>

      <SliderPrimitive.Root
         ref={ref}
         className={cn(
            'relative flex w-full touch-none select-none items-center mt-4',
            className,
         )}
         {...props}
      >
         <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />

            {/* Container for the step circles, overlaid on the track. */}
            <div className="absolute h-full w-full flex items-center justify-between">
               {labels.map((_, i) => (
                  <div key={i} className="h-3 w-3 rounded-full bg-background border-2 border-secondary" />
               ))}
            </div>
         </SliderPrimitive.Track>

         <SliderPrimitive.Thumb
            className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background
             transition-colors focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
   </div>
))

CategorySlider.displayName = 'CategorySlider'

export { CategorySlider }