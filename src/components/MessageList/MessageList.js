import {
  mapGetters,
  mapActions
} from "vuex"
import {
  GET_MESSAGES,
  ADD_MESSAGE,
} from "@/store/mutation-types"
import Message from "@/components/Message"

export default {
  name: "message-list",
  props: ["channel"],
  watch:{
    "$route": "setupMessages",
  },
  data() {
    return {
      message_value: "",
    }
  },
  components: {
    "message": Message,
  },
  beforeMount() {
    this.setupMessages()
  },
  computed: {
    ...mapGetters([
      "messages",
      "logged_in_user",
    ]),
  },
  methods: {
    ...mapActions([
      GET_MESSAGES,
      ADD_MESSAGE,
    ]),
    _notifyError(message) {
      this.$notify({
        title: "Failded!",
        message: message,
        type: "error"
      })
    },
    setupMessages: async function() {
      await this.GET_MESSAGES(this.channel)
        .catch(error => this._notifyError(`get message failed! ${error.message}`))
    },
    sendMessage() {
      this.ADD_MESSAGE({"channel_name": this.$route.params.channelname,
                        "index": this.messages.length,
                        "message":this.message_value,
                        "user": this.logged_in_user})
        .catch(error => this._notifyError(`send message failed! ${error.message}`))
      this.message_value = "";
    }
  }
}

