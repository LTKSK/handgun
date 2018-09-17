import { mapGetters, mapActions } from 'vuex'
import {
  GET_MESSAGES,
  ADD_MESSAGE
} from '@/store/mutation-types'

export default {
  name: 'MessageList',
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
      'messages',
    ]),
  },
  methods: {
    ...mapActions([
      GET_MESSAGES,
      ADD_MESSAGE,
    ]),
    getMessages() {
      this.GET_MESSAGES(this.$route.params.channelname)
    },
    sendMessage() {
      this.ADD_MESSAGE({"channel_name": this.$route.params.channelname,
                        "index": this.messages.length,
                        "message":this.message})
      this.message = "";
    }
  }
}

