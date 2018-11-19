import ChannelList from '@/components/ChannelList'
import MessageList from '@/components/MessageList'
import Image from '@/components/ReviewTarget/Image'

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
    'image-item': Image,
    'channel-list': ChannelList,
    'message-list': MessageList,
  },
}
