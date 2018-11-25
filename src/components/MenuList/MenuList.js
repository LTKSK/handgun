import { mapGetters, mapActions } from 'vuex'
import { GET_CHANNELS } from '@/store/mutation-types'
import UserMenu from '@/components/UserMenu'
import ChannelList from '@/components/ChanneLlist'
import LayerMenu from '@/components/LayerMenu'
import LayerList from '@/components/LayerList'

export default {
  name: 'menu-list',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'channels',
      'header'
    ]),
    currentChannel() {
      return this.$route.params.channelname
    }
  },
  methods: {
    ...mapActions([
      GET_CHANNELS,
    ]),
  },
  components: {
    "user-menu": UserMenu,
    "channel-list": ChannelList,
    "layer-menu": LayerMenu,
    "layer-list": LayerList,
  },
  mounted() {
    this.GET_CHANNELS(this.header)
      .catch(error => {
        this.$notify({
          title: "Failed!",
          message: `get channel list failed. ${error.message}`,
          type: "error"
        })
    })
  }
}
