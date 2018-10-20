import {
  mapGetters,
  mapActions
} from 'vuex'
import { GET_ICON } from '@/store/mutation-types'

export default {
  name: 'message',
  props: ["message"],
  data() {
    return {}
  },
  mounted() {
    this.setupIcon()
    const content = document.querySelector(".message-content")
    console.log(content)
  },
  computed: {
    ...mapGetters([
      "icon",
    ]),
  },
  methods: {
    ...mapActions([
      GET_ICON,
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
    }
  },
}


