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
      "icon",
      "current_layer"
    ]),
    styleObject() {
      return {
        backgroundColor: this._layerColorToStyle()
      }
    }
  },
  methods: {
    ...mapActions([
      GET_ICON,
      EDIT_MESSAGE,
      DELETE_MESSAGE
    ]),
    _isSameColor(layer, color) {
      return layer.color[0] === color[0]
             && layer.color[1] === color[1]
             && layer.color[2] === color[2]
    },
    _layerColorToStyle() {
      //TODO: layer from layers at index that message has.
      const layer = this.current_layer
      if(this._isSameColor(layer, [1, 0, 0, 1])) { return "#ff0000" }
      if(this._isSameColor(layer, [0, 1, 0, 1])) { return "#00ff00" }
      if(this._isSameColor(layer, [0, 0, 1, 1])) { return "#0000ff" }
      if(this._isSameColor(layer, [1, 1, 0, 1])) { return "#ffff00" }
      if(this._isSameColor(layer, [0, 1, 1, 1])) { return "#00ffff" }
      if(this._isSameColor(layer, [1, 0, 1, 1])) { return "#ff00ff" }
      if(this._isSameColor(layer, [0, 0, 0, 1])) { return "#000000" }
      if(this._isSameColor(layer, [1, 1, 1, 1])) { return "#ffffff" }
    },
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
      .catch(_ => {})
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
