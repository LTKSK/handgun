<template>
  <div class="channel-list">
    <ul>
      <li v-for="channel in channels" v-bind:key="channel">
        <router-link v-bind:to="{name: 'channel', params: {channelname: channel}}">
          {{ channel }}
        </router-link>
      </li>
    </ul>
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
</style>
