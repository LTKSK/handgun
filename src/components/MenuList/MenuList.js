import LogoutButton from '@/components/LogoutButton'

export default {
  name: 'menu-list',
  props: ["channel"],
  data() {
    return {}
  },
  components: {
    'logout-button': LogoutButton,
  },
}

