"use client";
import { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'

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
   const [scope, animate] = useAnimate();
   const linesArray = words.split('\n');
   useEffect(() => {
      animate(
         "span",
         {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
         },
         {
            duration: duration ? duration : 0.5,
            delay: stagger(0.01),
         }
      );
   }, [scope.current]);

   const renderWords = () => {
      return (
         <motion.div ref={scope}>
            {linesArray.map((line, lineIdx) => (
               <span key={`line-${lineIdx}`}>
                  {line.split(" ").map((word, idx) => (
                     <motion.span
                        key={word + idx}
                        className="dark:text-white text-black opacity-0"
                        style={{
                           filter: filter ? "blur(10px)" : "none",
                        }}
                     >
                        {word}{" "}
                     </motion.span>
                  ))}
                  {lineIdx < linesArray.length - 1 && <br />}
               </span>
            ))}
         </motion.div>
      );
   };

   return (
      <div className={className}>
         <div className="mt-4">
            <div className=" dark:text-white text-black text-sm leading-snug tracking-wide">
               {renderWords()}
            </div>
         </div>
      </div>
   );
};