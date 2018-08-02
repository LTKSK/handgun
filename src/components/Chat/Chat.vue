<template>
<div>
  <div class="channel-name">
    Hello Chat at {{ channel }}
  </div>
  <div class="review-target">
    <image-item />
  </div>
  <div>
    <channel-list />
  </div>
  <div>
    <message-list v-bind:messages="messages"/>
  </div>
  <div class="message-form">
    <input type="text" v-model="message">
    <input type="button" value="send" v-on:click="send_message" />
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
    SET_MESSAGE,
} from '../../store/mutation-types'
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
    send_message() {
      this.SET_MESSAGE(this.message)
      this.message = "";
    }
  }
}
</script>

<style scoped>
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