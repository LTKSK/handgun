import { mapGetters, mapActions } from 'vuex'
import { GET_CHANNELS } from '@/store/mutation-types'
import MenuList from '@/components/MenuList'

export default {
  name: 'channel-list',
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
    "menu-list": MenuList,
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
