import { mapGetters, mapActions } from 'vuex'
import { GET_CHANNELS } from '@/store/mutation-types'
import ChannelThumbnail from '@/components/ChannelThumbnail'

export default {
  name: 'channel-table',
  data() {
    return {}
  },
  components: {
    "channel-thumbnail": ChannelThumbnail
  },
  computed: {
    ...mapGetters([
      'channels',
      'header'
    ]),
  },
  methods: {
    ...mapActions([
      GET_CHANNELS,
    ]),
    numOfChannels(num) {
      const list_num_of_channels = new Array()
      for(let index = 0; index < Math.ceil(this.channels.length / num); ++index) {
        list_num_of_channels.push(this.channels.slice(index, index + num))
      }
      return list_num_of_channels
    }
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