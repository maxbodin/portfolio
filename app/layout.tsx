import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import PageWrapper from '@/components/custom/pageWrapper'
// import { Libre_Barcode_39 } from 'next/font/google'
import localFont from 'next/font/local'

export const metadata: Metadata = {
   title: '@MaxBod',
   description: 'Portfolio de @MaxBod',
}


const fontSans = localFont({
   src: [
      {
         path: './fonts/Satoshi-Regular.woff2',
         weight: '400',
         style: 'normal',
      },
      {
         path: './fonts/Satoshi-Medium.woff2',
         weight: '500',
         style: 'normal',
      },
      {
         path: './fonts/Satoshi-Bold.woff2',
         weight: '700',
         style: 'normal',
      },
   ],
   variable: '--font-sans',
})

export default function RootLayout({
                                      children,
                                   }: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
      <body className={`${fontSans.variable} font-sans`}>
      <PageWrapper>
         {children}
      </PageWrapper>
      <SpeedInsights />
      </body>
      </html>
   )
}