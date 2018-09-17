import { mapGetters, mapActions } from 'vuex'
import { GET_CHANNELS } from '@/store/mutation-types'
export default {
  name: 'channel-list',
  data() {
    return {}
  },
  mounted() {
    this.GET_CHANNELS()
  },
  computed: {
    ...mapGetters([
      'channels'
    ]),
  },
  methods: {
    ...mapActions([
      GET_CHANNELS,
    ]),
  }
}
