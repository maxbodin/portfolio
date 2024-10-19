import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
      {children}
      <SpeedInsights />
      </body>
      </html>
   )
}
