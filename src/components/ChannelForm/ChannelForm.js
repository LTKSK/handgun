import { mapActions } from 'vuex'
import { ADD_CHANNEL } from '@/store/mutation-types'
export default {
  name: 'channel-form',
  data() {
    return {
      channel: '',
      file: null,
      files: [],
    }
  },
  computed: {
    disabled() {
      return this.file === null || this.channel === ""
    }
  },
  methods: {
    ...mapActions([
      ADD_CHANNEL,
    ]),
    _goToAddedChannel(){
      this.$router.push({name: "chat", params: {"channelname": this.channel}})
    },
    addChannelSucceeded() {
      this.$notify({
        title: "Success!",
        message: "Add channel succeeded",
        type: "success"
      }).onClose = this._goToAddedChannel
    },
    addChannelFailed() {
      this.$notify({
        title: "Failed!",
        message: "Add channel failed",
        type: "error"
      })
    },
    addChannel() {
      this.ADD_CHANNEL({file: this.file, channel: this.channel})
        .then(succeed => {
          if(succeed){
            this.addChannelSucceeded()
            return
          }
          this.addChannelFailed()
        })
    },
    fileSelected(file, fileList) {
      this.file = file.raw
      this.files = fileList
    },
    fileReset() {
      this.file = null;
    },
    filesExceed() {
      this.$message.warning("you can upload only 1 file.")
    }
  }
}
