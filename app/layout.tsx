import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import PageWrapper from '@/components/custom/pageWrapper'

export const metadata: Metadata = {
   title: '@MaxBod',
   description: 'Portfolio de @MaxBod',
}

export default function RootLayout({
                                      children,
                                   }: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="fr">
      <body className={'font-mono'}>
      <PageWrapper>
         {children}
      </PageWrapper>
      <SpeedInsights />
      </body>
      </html>
   )
}