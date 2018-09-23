import { mapGetters, mapActions } from 'vuex'
import { GET_CHANNELS } from '@/store/mutation-types'
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
  mounted() {
    this.GET_CHANNELS(this.header)
  }
}
