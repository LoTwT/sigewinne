import { StatusCode } from "~/utils/status-code"
import type { MessageResponse } from "~/utils/types"

const history: string[] = []

interface Request {
  body: {
    message: string
  }
}

export default defineEventHandler<Request>(
  async (event): Promise<MessageResponse> => {
    const runtimeConfig = useRuntimeConfig()

    const body = await readBody(event)

    if (!body.message) {
      return {
        code: StatusCode.Message.Empty,
        data: { msg: "Empty Input Message", history },
      }
    }

    if (body.message.length > 500) {
      return {
        code: StatusCode.Message.Large,
        data: { msg: "Large Input Message", history },
      }
    }

    try {
      const { reply } = await $fetch<{ reply: string }>("/message", {
        baseURL: runtimeConfig.apiUrl,
        method: "post",
        body,
      })

      history.push(body.message)

      return {
        code: StatusCode.Message.Success,
        data: { msg: reply, history },
      }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: error?.message ?? "Internal Server Error",
      })
    }
  },
)
