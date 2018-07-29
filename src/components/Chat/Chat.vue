<template>
<div>
  <div class="channel-name">
    Hello Chat at {{ channel }}
  </div>
  <div class="review-target">
    <image-item />
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
    GET_CHANNELS
} from '../../store/mutation-types'
import MessageList from './MessageList'
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
    'message-list': MessageList
  },
  mounted() {
    this.GET_CHANNELS()
  },
  computed: {
    ...mapGetters([
      'messages',
      'channels'
    ]),
  },
  methods: {
    ...mapActions([
      SET_MESSAGE,
      GET_CHANNELS
    ]),
    send_message() {
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