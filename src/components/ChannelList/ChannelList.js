import { mapGetters, mapActions } from 'vuex'
import {
  GET_CHANNELS,
  GET_LAYERS
} from '@/store/mutation-types'

export default {
  name: 'channel-list',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'channels'
    ]),
    currentChannel() {
      return this.$route.params.channelname
    }
  },
  methods: {
    ...mapActions([
      GET_CHANNELS,
      GET_LAYERS
    ]),
  },
  mounted() {
    this.GET_CHANNELS()
      .catch(error => {
        this.$notify({
          title: "Failed!",
          message: `get channel list failed. ${error.message}`,
          type: "error"
        })
    })
  }
}
