import MenuList from '@/components/MenuList'
import MessageList from '@/components/MessageList'
import ReviewTarget from '@/components/ReviewTarget'
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  GET_LAYERS,
  UPDATE_LAYERS
} from '@/store/mutation-types'

export default {
  name: 'review-page',
  watch:{
    "$route" (to, from) {
      if (! /channel\/.*/.test(from.path)) {
        this.GET_LAYERS(to.params.channelname)
        return
      }
      this.UPDATE_LAYERS({"channel_name": from.params.channelname,
                          "layers": this.layers})
        .then(() => {
          // if to.path is channel/*, update layers.
          if (/channel\/.*/.test(to.path)) {
            this.GET_LAYERS(to.params.channelname)
          }
        })
    },

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
      GET_LAYERS,
      UPDATE_LAYERS
    ]),
  },
  mounted() {
    this.GET_LAYERS(this.$route.params.channelname)
  }
}
