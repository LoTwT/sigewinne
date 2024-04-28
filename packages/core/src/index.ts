import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => {
  return c.text("Hello from Sigewinne Core!")
})

app.post("/message", async (c) => {
  const { message } = await c.req.json()
  return c.json({ reply: `Received message: ${message}` })
})

export default app
