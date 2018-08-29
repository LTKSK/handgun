<template>
  <div class="add-channel-form">
    <input type="text" v-model="channel_name">
    <input type="button" value="add" v-on:click="ADD_CHANNEL(new_channel_name)" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'channel_form',
      channel_name: '',
    }
  }
}
</script>

<style>
.add-channel-form {
  text-align: center;
}
</style>