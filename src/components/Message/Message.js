import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  GET_ICON,
  EDIT_MESSAGE,
  DELETE_MESSAGE,
 } from '@/store/mutation-types'
import {
  putMessage,
  deleteMessage,
} from "@/module/webapiRepository"

export default {
  name: 'message',
  props: ["message"],
  data() {
    return {
      hoverd: false,
    }
  },
  computed: {
    ...mapGetters([
      "icon",
    ]),
  },
  methods: {
    ...mapActions([
      GET_ICON,
      EDIT_MESSAGE,
      DELETE_MESSAGE,
    ]),
    _notifyError(message) {
      this.$notify({
        title: "Failded!",
        message: message,
        type: 'error'
      })
    },
    setupIcon: async function() {
      await this.GET_ICON(this.message.user)
        .catch(error => this._notifyError(`get icon failed! ${error.message}`))
    },
    replyMessage() {
    },
    editMessage() {
      // this.EDIT_MESSAGE(this.message)
    },
    deleteMessage() {
      this.DELETE_MESSAGE(this.message)
    },
    _mouserover() {
      this.hoverd = true
    },
    _mouseleave() {
      this.hoverd = false
    },
  },
  mounted() {
    this.setupIcon()
    const content = this.$el
    content.addEventListener("mouseover", this._mouserover)
    content.addEventListener("mouseleave", this._mouseleave)
  },
}


