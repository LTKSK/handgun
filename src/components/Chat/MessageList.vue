<template>
  <ul class="msg-list">
    <li v-for="msg in messages">{{ msg }}</li>
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
  text-align: center;
  grid-area: 2/2;
  height: 300px;
  overflow: scroll;
}
</style>