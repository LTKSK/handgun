import { mapGetters, mapActions } from 'vuex'
import {
  GET_MESSAGES,
  ADD_MESSAGE,
  ADD_ICON,
} from '@/store/mutation-types'
import { fetchUserIcon } from '@/module/webapiRepository'

export default {
  name: 'message-list',
  watch:{
    '$route': 'getMessages',
  },
  data() {
    return {
      message: "",
    }
  },
  mounted() {
    this.getMessages()
  },
  computed: {
    ...mapGetters([
      "messages",
      "logged_in_user",
      "icon",
    ]),
  },
  methods: {
    ...mapActions([
      GET_MESSAGES,
      ADD_MESSAGE,
      ADD_ICON,
    ]),
    getMessages() {
      this.GET_MESSAGES(this.$route.params.channelname)
    },
    getIconSource(username) {
      let icon_data = this.icon(username)
      if (icon_data) {
        return URL.createObjectURL(icon_data)
      }
      fetchUserIcon(username)
        .then(icon => {
          this.ADD_ICON({username, icon})
          return icon
        })
    },
    sendMessage() {
      this.ADD_MESSAGE({"channel_name": this.$route.params.channelname,
                        "index": this.messages.length,
                        "message":this.message,
                        "user": this.logged_in_user})
      this.message = "";
    }
  }
}

