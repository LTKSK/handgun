<template>
  <el-container class="channel">
    <el-aside width="150px">
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
.el-aside {
  padding: 0;
}
</style>
