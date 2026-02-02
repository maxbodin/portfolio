import * as React from 'react'
import { WorkDetails } from '@/interfaces/workDetails'
import WorkFolder from '@/components/custom/workFolder'

export default function YearlyWorksFolders({ items, title, anchor }: {
   items: WorkDetails[],
   title: string,
   anchor: string
}) {
   const groupedByYear = items.reduce((acc, item) => {
      const year = item.date?.match(/\d{4}$/)?.[0] || 'Undated'
      if (!acc[year]) {
         acc[year] = []
      }
      acc[year].push(item)
      return acc
   }, {} as Record<string, WorkDetails[]>)

   const sortedYears = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a))

   return (
      <section id={`${anchor}`} className="pt-16">
         <h2 className="text-2xl pb-4">{title}</h2>

         <div className="space-y-12">
            {sortedYears.map((year) => (
               <div key={year} className="pl-4">
                  <h3 className="text-xl">
                     {year}
                  </h3>
                  <div className="space-y-4">
                     {groupedByYear[year].map((item: WorkDetails, index: number) => (
                        <WorkFolder key={`${item.title}-${index}`} item={item} />
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </section>
   )
}