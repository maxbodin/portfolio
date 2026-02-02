'use client'

import { Button } from '@/components/ui/button'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { BarcodeIcon } from 'lucide-react'

export default function FontToggleButton() {
   const [barcode, setBarcode] = useState<boolean>(false)

   useEffect(() => {
      document.body.classList.toggle('font-barcode', barcode)
      document.body.classList.toggle('font-sans', !barcode)
   }, [barcode])

   return (
      <Button variant="ghost" size="icon" className="h-8 w-8 bg-transparent hover:bg-gray-100 mt-1"
              onClick={() => setBarcode(v => !v)}>
         <BarcodeIcon className="h-4 w-4" />
      </Button>
   )
}
