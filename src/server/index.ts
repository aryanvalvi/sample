import {getGeminiResponse} from "@/utils/gemini"
import {publicProcedure, router} from "./trpc"
import {z} from "zod"
export const appRouter2 = router({
  getToDos: publicProcedure.query(async () => {
    return [10, 20, 30]
  }),
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string(),
        mode: z.enum(["text", "image"]),
      })
    )
    .mutation(async ({input}) => {
      let content: string

      if (input.mode === "image") {
        content =
          "🎨 This is a placeholder image response (Gemini Vision not integrated yet)."
      } else {
        content = await getGeminiResponse(input.message)
      }

      return {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        messageType: input.mode,
      }
    }),
})

export type AppRouter2 = typeof appRouter2
