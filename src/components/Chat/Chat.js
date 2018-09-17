import ChannelList from '@/components/ChannelList'
import MessageList from '@/components/MessageList'
import Image from '../ReviewTarget/Image'

export default {
  name: 'chat',
  data() {
    return {}
  },
  computed: {
    channel: function() {
      return this.$route.params.channelname
    }
  },
  components: {
    'image-item': Image,
    'channel-list': ChannelList,
    'message-list': MessageList,
  },
}
