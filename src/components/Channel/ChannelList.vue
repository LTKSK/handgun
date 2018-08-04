<template>
  <div>
    <ul>
      <li v-for="channel in channels" :key="channel">
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
    GET_CHANNELS
} from '../../store/mutation-types'
export default {
  data() {
    name: 'channels'
    return {
      cannnel: this.$route.params.cahnnelname
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
      GET_CHANNELS
    ]),
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
