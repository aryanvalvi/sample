import {appRouter2} from "@/server"
import {fetchRequestHandler} from "@trpc/server/adapters/fetch"
import {NextRequest, NextResponse} from "next/server"

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter2,
    createContext: () => ({}),
  })
    .then(response => {
      return response
    })
    .catch(error => {
      // Handle errors and return a proper response
      console.error("tRPC handler error:", error)
      return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    })
}

export {handler as GET, handler as POST}
