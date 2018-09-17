import ChannelList from '@/components/ChannelList'
import MessageList from '@/components/MessageList'
import Image from '../ReviewTarget/Image'

export default {
  name: 'chat',
  watch:{
    '$route': 'getMessages',
  },
  data() {
    return {}
  },
  components: {
    'image-item': Image,
    'channel-list': ChannelList,
    'message-list': MessageList,
  },
}
