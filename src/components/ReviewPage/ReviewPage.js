import ChannelList from '@/components/ChannelList'
import MessageList from '@/components/MessageList'
import ReviewTarget from '@/components/ReviewTarget'

export default {
  name: 'review-page',
  data() {
    return {}
  },
  computed: {
    channel() {
      return this.$route.params.channelname
    }
  },
  components: {
    'review-target': ReviewTarget,
    'channel-list': ChannelList,
    'message-list': MessageList,
  },
}
