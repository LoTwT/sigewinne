export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const runtimeConfig = useRuntimeConfig()

  const data = await $fetch("/message", {
    baseURL: runtimeConfig.apiUrl,
    method: "post",
    body,
  })

  return data
})
