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
      "layers",
      "current_layer"
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
      // new message's index is the biggest index + 1
      // because some message may be deleted.
      const index = this.messages
                        .map(message => message.index)
                        .reduce((a, b) => a > b ? a : b, 0) + 1
      const layer_index = this.layers.indexOf(this.current_layer)
      console.log(layer_index)
      // this.ADD_MESSAGE({"channel_name": this.$route.params.channelname,
      //                   "index": index,
      //                   "message":this.message_value,
      //                   "user": this.logged_in_user})
      //   .catch(error => this._notifyError(`send message failed! ${error.message}`))
      this.message_value = "";
    }
  }
}

