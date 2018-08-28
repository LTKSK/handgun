<template>
  <div class="channel-list">
    <ul>
      <li v-for="channel in channels" :key="channel">
        <router-link v-bind:to="{name: 'channel', params: {channelname: channel}}">
          {{ channel }}
        </router-link>
      </li>
    </ul>
    <div class="new-channel-form">
      <input type="text" v-model="new_channel_name">
      <input type="button" value="add" v-on:click="ADD_CHANNEL(new_channel_name)" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
    GET_CHANNELS,
    ADD_CHANNEL,
} from '../../store/mutation-types'
export default {
  data() {
    return {
      name: 'channels',
      new_channel_name: '',
    }
  },
  mounted() {
    this.GET_CHANNELS()
  },
  computed: {
    ...mapGetters([
      'channels'
    ]),
  },
  methods: {
    ...mapActions([
      GET_CHANNELS,
      ADD_CHANNEL,
    ]),
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
.channel-list {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.new-channel-form {
  text-align: center;
}
</style>
