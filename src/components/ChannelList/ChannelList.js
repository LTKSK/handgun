import { mapGetters, mapActions } from 'vuex'
import { GET_CHANNELS } from '@/store/mutation-types'
import LogoutButton from '@/components/LogoutButton'

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
  },
  methods: {
    ...mapActions([
      GET_CHANNELS,
    ]),
  },
  components: {
    'logout-button': LogoutButton,
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
