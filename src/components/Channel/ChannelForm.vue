<template>
  <div class="add-channel-form">
    <input type="text" v-model="channel">
    <input type="button" value="add" v-on:click="ADD_CHANNEL(channel)" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ADD_CHANNEL } from '../../store/mutation-types'
export default {
  data() {
    return {
      name: 'channel_form',
      channel: '',
    }
  },
  methods: {
    ...mapActions([
      ADD_CHANNEL,
    ])
  }
}
</script>

<style>
.add-channel-form {
  text-align: center;
}
</style>