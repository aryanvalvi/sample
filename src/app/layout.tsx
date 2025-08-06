// src/app/layout.tsx
import "./global.css"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
// import Provider from "@/_trpc/Provider"

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"
import Provider2 from "./_trpc/Provider2"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "tRPC Assignment",
  description: "Next.js, tRPC, and Bootstrap",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the children with the tRPC Provider */}
        {/* <AuthComponent></AuthComponent> */}

        {/* <a href="/auth/login">Login</a> */}
        <Provider2>{children}</Provider2>
      </body>
    </html>
  )
}
