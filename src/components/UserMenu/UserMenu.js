import LogoutButton from '@/components/LogoutButton'
import ChannelDeleteButton from '@/components/ChannelDeleteButton'

export default {
  name: 'user-menu',
  props: ["channel"],
  data() {
    return {}
  },
  components: {
    'logout-button': LogoutButton,
    'delete-button': ChannelDeleteButton
  },
}

