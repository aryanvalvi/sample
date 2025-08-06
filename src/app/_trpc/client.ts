import {createTRPCReact} from "@trpc/react-query"
import {type AppRouter2} from "../../server/index"

// This is the client-side entry point for tRPC
export const trpc = createTRPCReact<AppRouter2>({})
