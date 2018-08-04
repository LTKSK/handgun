<template>
  <ul class="msg-list">
    <li v-for="msg in messages" :key="msg">{{ msg }}</li>
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
  /* grid-area: 2/2; */
  /* height: 100%; */
  overflow: scroll;
}
</style>