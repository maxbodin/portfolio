'use client';
import { useCallback, useMemo, useState } from 'react'
import { WorkDetails } from '@/interfaces/workDetails'
import WorkFolder from '@/components/custom/workFolder'
import { Button } from '@/components/ui/button'

function getYear(date?: string) {
   return date?.match(/\d{4}$/)?.[0] || 'Undated'
}

function collectFolderIds(item: WorkDetails, rootFolderId: string): string[] {
   const ids = [rootFolderId]

   item.related_works?.forEach((relatedWork, index) => {
      ids.push(...collectFolderIds(relatedWork, `${rootFolderId}/related-${index}`))
   })

   return ids
}

export default function YearlyWorksFolders({ items, title, anchor }: {
   items: WorkDetails[],
   title: string,
   anchor: string
}) {
   const groupedByYear = useMemo(() => items.reduce((acc, item) => {
      const year = getYear(item.date)
      if (!acc[year]) {
         acc[year] = []
      }
      acc[year].push(item)
      return acc
   }, {} as Record<string, WorkDetails[]>), [items])

   const sortedYears = useMemo(
      () => Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a)),
      [groupedByYear],
   )

   const allFolderIds = useMemo(() => {
      const ids: string[] = []

      sortedYears.forEach((year) => {
         groupedByYear[year].forEach((item, index) => {
            ids.push(...collectFolderIds(item, `${anchor}/${year}/${index}`))
         })
      })

      return ids
   }, [anchor, groupedByYear, sortedYears])

   const [openFolderIds, setOpenFolderIds] = useState<Set<string>>(new Set())

   const areAllOpen = allFolderIds.length > 0 && allFolderIds.every((folderId) => openFolderIds.has(folderId))

   const handleToggleAll = useCallback(() => {
      setOpenFolderIds((previousOpenFolderIds) => {
         const shouldCloseAll =
            allFolderIds.length > 0 && allFolderIds.every((folderId) => previousOpenFolderIds.has(folderId))

         return shouldCloseAll ? new Set<string>() : new Set(allFolderIds)
      })
   }, [allFolderIds])

   const handleFolderOpenChange = useCallback((folderId: string, isOpen: boolean) => {
      setOpenFolderIds((previousOpenFolderIds) => {
         const nextOpenFolderIds = new Set(previousOpenFolderIds)

         if (isOpen) {
            nextOpenFolderIds.add(folderId)
         } else {
            nextOpenFolderIds.delete(folderId)
         }

         return nextOpenFolderIds
      })
   }, [])

   return (
      <section id={`${anchor}`} className="pt-16">
         <div className="flex items-center justify-between gap-4 pb-4">
            <h2 className="text-2xl">{title}</h2>
            {allFolderIds.length > 0 && (
               <Button type="button" variant="outline" size="xs" onClick={handleToggleAll} className="text-muted-foreground">
                  {areAllOpen ? 'Close all' : 'Open all'}
               </Button>
            )}
         </div>

         <div className="space-y-12">
            {sortedYears.map((year) => (
               <div key={year} className="pl-4">
                  <h3 className="text-xl">
                     {year}
                  </h3>
                  <div className="space-y-4">
                     {groupedByYear[year].map((item: WorkDetails, index: number) => (
                        <WorkFolder
                           key={`${item.title}-${index}`}
                           item={item}
                           folderId={`${anchor}/${year}/${index}`}
                           openItemIds={openFolderIds}
                           onOpenItemChangeAction={handleFolderOpenChange}
                        />
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </section>
   )
}