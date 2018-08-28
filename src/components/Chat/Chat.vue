<template>
<div class="view">
  <div class="channel-name">
    <channel-list />
  </div>
  <div class="review-target">
    <image-item />
  </div>
  <div class="chat-elements">
    <message-list v-bind:messages="messages"/>
    <div class="message-form">
      <input type="text" v-model="message">
      <input type="button" value="send" v-on:click="sendMessage" />
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { SET_MESSAGE } from '../../store/mutation-types'
import MessageList from './MessageList'
import ChannelList from '../Channel/ChannelList'
import Image from '../ReviewTarget/Image'

export default {
  name: 'chat',
  data() {
    return {
      channel: this.$route.params.channelname,
      message: "",
    }
  },
  components: {
    'image-item': Image,
    'message-list': MessageList,
    'channel-list': ChannelList,
  },
  computed: {
    ...mapGetters([
      'messages',
    ]),
  },
  methods: {
    ...mapActions([
      SET_MESSAGE,
    ]),
    sendMessage() {
      this.SET_MESSAGE(this.message)
      this.message = "";
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}

.view {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}
.chat-elements {
  float: right;
}
.channel-name {
  text-align: center;
}
.message-form {
  text-align: center;
}
.review-target {
  text-align: center;
}
</style>