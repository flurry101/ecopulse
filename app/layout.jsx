import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EcoPulse - Carbon Footprint Tracker",
  description:
    "A responsive web application for tracking personal carbon emissions and promoting sustainable lifestyle choices",
  generator: 'Next.js',
  applicationName: "EcoPulse",
  keywords: [
    "carbon footprint",
    "sustainability",
    "eco-friendly",
    "environment",
    "green living",
    "carbon emissions",
    "climate change",
    "personal tracker",
    "lifestyle choices",
  ]
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
