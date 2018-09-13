<template>
  <el-container class="channel">
    <channel-list />
    <channel-form />
  </el-container>
</template>

<script>
import ChannelForm from './ChannelForm'
import ChannelList from './ChannelList'
export default {
  data() {
    return {
      name: 'channel',
    }
  },
  components: {
    'channel-form': ChannelForm,
    'channel-list': ChannelList
  },

}
</script>

<style>
.channel {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
