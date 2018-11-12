import { mapGetters, mapActions } from 'vuex'
import { GET_CHANNELS } from '@/store/mutation-types'

export default {
  name: 'channel-table',
  data() {
    return {}
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
    listThreeOfChannels() {
      const list_three_of_channels = new Array()
      for (let index = 0; index < Math.ceil(this.channels.length / 3); ++index) {
        list_three_of_channels.push(this.channels.slice(index, index + 3))
      }
      console.log(list_three_of_channels)
      return list_three_of_channels
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