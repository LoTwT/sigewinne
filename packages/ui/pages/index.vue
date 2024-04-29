<script setup lang="ts">
const message = ref("")

const { data, pending, error, refresh } = await useAsyncData(
  "/api/message",
  () =>
    $fetch<MessageResponse>("/api/message", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ message: message.value }),
    }),
  {
    default: () => ({
      code: StatusCode.Message.Error,
      data: {
        msg: "error default",
        history: [],
      },
    }),
  },
)

const send = () => {
  refresh()
}
</script>

<template>
  <div>
    <input v-model="message" />
    <button @click="send" :disabled="pending">Send</button>
    <p v-if="pending">Sending...</p>
    <p v-if="error">Error: {{ error }}</p>
    <div v-if="data">
      <div>{{ data.data.msg }}</div>
      <ul>
        <li v-for="(msg, index) in data.data.history" :key="index">
          {{ msg }}
        </li>
      </ul>
    </div>
  </div>
</template>
