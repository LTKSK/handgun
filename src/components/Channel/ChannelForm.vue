<template>
  <div class="add-channel-form">
    <div>
      <input type="text" v-model="channel">
      <input type="button" value="Create channel"
       v-on:click="ADD_CHANNEL({channel, file})" />
    </div>
    <img class="thumbnail" v-bind:src="thumbnail" v-show="thumbnail">
    <input type="file" v-on:change="fileSelected" v-show="!file">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ADD_CHANNEL } from '@/store/mutation-types'
export default {
  data() {
    return {
      name: 'channel_form',
      channel: '',
      file: null,
      thumbnail: null,
    }
  },
  methods: {
    ...mapActions([
      ADD_CHANNEL,
    ]),
    fileSelected(file_data) {
      const files = file_data.target.files || file_data.dataTransfer.files
      if (files.length == 0) {
        return
      }
      const reader = new FileReader()
      reader.onload = loaded_data => {
        this.thumbnail = loaded_data.target.result
      }
      reader.readAsDataURL(files[0])
      this.file = files[0]
    }
  }
}
</script>

<style>
.add-channel-form {
  text-align: center;
}
.thumbnail {
  width: 512px;
  height: auto;
}
</style>