<script setup lang="ts">
const message = ref("default")

const { data, refresh } = await useFetch("/api/message", {
  method: "post",
  headers: {
    "content-type": "application/json",
  },
  body: computed(() => JSON.stringify({ message: message.value })),
})

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
