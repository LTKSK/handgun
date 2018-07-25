<template>
<div>Hello Chat at {{ channel }}
  <div>
    <ul>
      <li v-for="msg in messages">{{ msg }}</li>
    </ul>
  </div>
  <div>
    <input type="text" v-model="message">
    <input type="button" value="send" v-on:click="send_message" />
  </div>
</div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      channel: this.$route.params.channelname,
      message: "",
      messages: [],
    }
  },
  methods: {
    send_message() {
      this.messages.push(this.message);
      this.message = "";
    }
  }
}
</script>
