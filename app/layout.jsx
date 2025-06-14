import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from '@vercel/analytics/react'
import favicon from '@/app/favicon.ico'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EcoPulse",
  description: "A responsive web application for tracking personal carbon emissions and promoting sustainable lifestyle choices",
  icons: {
    icon: favicon.src,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
