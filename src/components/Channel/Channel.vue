<template>
  <el-container class="channel">
    <el-aside class="channel-list">
      <channel-list />
    </el-aside>
    <el-main>
      <channel-form />
    </el-main>
  </el-container>
</template>

<script>
import ChannelForm from './ChannelForm.vue'
import ChannelList from './ChannelList.vue'
export default {
  name: 'channel',
  data() {
    return {}
  },
  components: {
    'channel-form': ChannelForm,
    'channel-list': ChannelList
  },
}
</script>

<style>
</style>
