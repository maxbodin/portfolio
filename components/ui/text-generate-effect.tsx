'use client'
import { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '@/lib/utils'

export const TextGenerateEffect = ({
                                      words,
                                      className,
                                      filter = true,
                                      duration = 0.5,
                                   }: {
   words: string;
   className?: string;
   filter?: boolean;
   duration?: number;
}) => {
   const [scope, animate] = useAnimate()
   const linesArray = words.split('\n')
   useEffect(() => {
      animate(
         'span',
         { opacity: 1, filter: filter ? 'blur(0px)' : 'none' },
         { duration: duration, delay: stagger(0.01) },
      )
   }, [scope.current, words, filter, duration, animate])

   const renderWords = () => {
      return (
         <motion.div ref={scope}>
            {linesArray.map((line, lineIdx) => (
               <span key={`line-${lineIdx}`}>
                  {line.split(' ').map((word, idx) => (
                     <motion.span
                        key={word + idx}
                        className="opacity-0"
                        style={{ filter: filter ? 'blur(10px)' : 'none' }}
                     >
                        {word}{' '}
                     </motion.span>
                  ))}
                  {lineIdx < linesArray.length - 1 && <br />}
               </span>
            ))}
         </motion.div>
      )
   }

   return (
      <div>
         <div className="mt-4">
            <div className={cn(
               'dark:text-white text-black leading-snug tracking-wide',
               className,
            )}>
               {renderWords()}
            </div>
         </div>
      </div>
   )
}