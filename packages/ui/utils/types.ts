export interface MessageResponse {
  code: (typeof StatusCode.Message)[keyof typeof StatusCode.Message]
  data: {
    msg: string
    history: string[]
  }
}
