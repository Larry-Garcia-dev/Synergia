import React from "react"
import type { Metadata } from 'next'
import { Outfit, Playfair_Display } from 'next/font/google'

import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'SYN3RGIA - Tres mentes, Tres enfoques, Un solo proposito',
  description: 'SYN3RGIA Solutions & Consulting, Projects, Tax & Legal - Asesores integrales para tu negocio.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
