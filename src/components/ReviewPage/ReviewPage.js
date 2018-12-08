import MenuList from '@/components/MenuList'
import MessageList from '@/components/MessageList'
import ReviewTarget from '@/components/ReviewTarget'
import {
  mapGetters,
  mapActions
} from 'vuex'
import { GET_LAYERS } from '@/store/mutation-types'

export default {
  name: 'review-page',
  watch:{
    "$route": "GET_LAYERS",
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      "layers"
    ]),
    channel() {
      return this.$route.params.channelname
    }
  },
  components: {
    'review-target': ReviewTarget,
    'menu-list': MenuList,
    'message-list': MessageList,
  },
  methods: {
    ...mapActions([
      GET_LAYERS
    ]),
  },
  mounted() {
    this.GET_LAYERS(this.$route.params.channelname)
  }
}
