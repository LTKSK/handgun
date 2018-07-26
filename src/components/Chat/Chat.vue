<template>
<div>
  <div class="channel-name">
    Hello Chat at {{ channel }}
  </div>
  <div class="view">
    <ul>
      <li v-for="channel in channels">
        <router-link v-bind:to="{name: 'channel', params: {channelname: channel}}">
          {{ channel }}
        </router-link>
      </li>
    </ul>
  </div>
  <div>
    <ul class="message-list">
      <li v-for="msg in messages">{{ msg }}</li>
    </ul>
  </div>
  <div class="message-form">
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
      channels: ["movie", "image"],
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

<style scoped>
ul {
  list-style: none;
}
.channel-name {
  text-align: center;
}
.message-list {
  text-align: center;
  grid-area: 2/2;
  height: 300px;
  overflow: scroll;
}
.message-form {
  text-align: center;
}
</style>