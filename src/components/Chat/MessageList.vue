<template>
  <ul class="msg-list">
    <li v-for="msg in messages">
      {{ msg.user }}
      {{ msg.date }}
      {{ msg.value }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'message-list',
  props:{
    'messages': {
      type: Array,
      default: [],
      requeired: true
    }
  },
}
</script>

<style scoped>
.msg-list {
  text-align: left;
  height: 100%;
  overflow: scroll;
}
</style>