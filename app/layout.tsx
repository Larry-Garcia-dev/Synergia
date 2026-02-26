import React from "react"
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'SYN3RGIA - Tres mentes, Tres enfoques, Un solo proposito',
  description: 'SYN3RGIA Solutions & Consulting, Projects, Tax & Legal - Asesores integrales para tu negocio.',
  icons: {
    icon: '/images/logo.png', // Asegúrate de que el archivo esté en la carpeta /public
    // O si usas un PNG:
    //apple: '/images/logo-vertical-solutions-negro.png', 
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* Truco: El visitante descarga las fuentes directamente, no el servidor */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Playfair+Display:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      
      {/* Inyectamos las variables de las fuentes manualmente para que Tailwind las detecte */}
      <body 
        className="font-sans antialiased" 
        style={{ 
          '--font-outfit': '"Outfit", sans-serif', 
          '--font-playfair': '"Playfair Display", serif' 
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  )
}