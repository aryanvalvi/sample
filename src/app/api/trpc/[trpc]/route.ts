import {appRouter2} from "@/server"
import {fetchRequestHandler} from "@trpc/server/adapters/fetch"
import {NextRequest, NextResponse} from "next/server"

// 👇 Add your allowed origins here
const ALLOWED_ORIGINS = [
  "https://ai.uiuxyn.xyz",
  "http://localhost:3000", // dev
]

const handler = async (req: NextRequest) => {
  const origin = req.headers.get("origin") || ""
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin)

  // 🟡 Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true",
      },
    })
  }

  // 🟢 Main tRPC request handler
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter2,
    createContext: () => ({}),
    onError({error}) {
      console.error("tRPC error:", error)
    },
  })

  // 🟢 Manually add CORS headers to response
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin)
    response.headers.set("Access-Control-Allow-Credentials", "true")
  }

  return response
}

export {handler as GET, handler as POST, handler as OPTIONS}
