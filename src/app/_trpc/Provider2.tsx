"use client"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {useState} from "react"
import {trpc} from "./client"
import {httpBatchLink} from "@trpc/client"

export default function Provider2({children}: {children: React.ReactNode}) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "https://api2.uiuxyn.xyz/api/trpc",
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
