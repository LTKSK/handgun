import { mapGetters, mapActions } from 'vuex'
import { GET_CHANNELS } from '@/store/mutation-types'
export default {
  data() {
    return {
      name: 'channel-list',
    }
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
