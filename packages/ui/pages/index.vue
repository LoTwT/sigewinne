<script setup lang="ts">
const message = ref("")

const { data, refresh } = await useAsyncData("/api/message", () =>
  $fetch("/api/message", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message: message.value }),
  }),
)

const send = () => {
  refresh()
}
</script>

<template>
  <div>
    <input v-model="message" />
    <button @click="send">send</button>
    <div>{{ data.reply }}</div>
  </div>
</template>
