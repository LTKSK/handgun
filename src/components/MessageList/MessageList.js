import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  GET_MESSAGES,
  ADD_MESSAGE,
  GET_ICON,
} from '@/store/mutation-types'

export default {
  name: 'message-list',
  props: ["channel"],
  watch:{
    '$route': 'setupMessages',
  },
  data() {
    return {
      message: "",
    }
  },
  beforeMount() {
    this.setupMessages()
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
      GET_ICON,
    ]),
    setupMessages: async function() {
      await this.GET_MESSAGES(this.channel)
      for(let user of Array.from(new Set(this.messages.map(message => message.user)))) {
         this.GET_ICON(user)
      }
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

