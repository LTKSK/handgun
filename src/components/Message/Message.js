import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  GET_ICON,
  EDIT_MESSAGE,
  DELETE_MESSAGE,
 } from '@/store/mutation-types'

export default {
  name: 'message',
  props: ["message"],
  data() {
    return {
      hoverd: false,
      is_editing: false,
      edit_message: ""
    }
  },
  computed: {
    ...mapGetters([
      "icon"
    ]),
  },
  methods: {
    ...mapActions([
      GET_ICON,
      EDIT_MESSAGE,
      DELETE_MESSAGE
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
    editStart() {
      this.edit_message = JSON.parse(JSON.stringify(this.message.value))
      this.is_editing = true
      // buttons don't show while editing
      this.hoverd = false
    },
    editDone(apply=false) {
      this.is_editing = false
      if (apply === false || this.edit_message === "") {
        return
      }
      this.message.value = JSON.parse(JSON.stringify(this.edit_message))
      this.EDIT_MESSAGE(this.message)
    },
    deleteMessage() {
      this.$confirm(
        "Do you want to delete message?",
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
      .then(() => {
        this.DELETE_MESSAGE(this.message)
      })
      .catch(error => {})
    },
    _mouserover() {
      if (this.is_editing) {
        return
      }
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


