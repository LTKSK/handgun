import { mapGetters, mapActions } from 'vuex'
import { ADD_CHANNEL } from '@/store/mutation-types'
export default {
  name: 'channel-form',
  data() {
    return {
      form: {
        channel: '',
      },
      file: null,
      files: [],
      rules: {
        channel: [
          {
            required: true,
            message: "channel name is required",
            trigger: "blur"
          },
          {
            message: "Please dont input only space",
            whitespace: true,
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if(! /^[a-zA-Z0-9]\w*[a-zA-Z0-9]$/.test(value)){
                callback(new Error("You can only use aplhanumeric characters and '_' for username"))
              }
              callback()
            },
            trigger: "blur"
          }
        ]
      }
    }
  },
  computed: {
    disabled() {
      return this.file === null
    },
    ...mapGetters([
      'header'
    ]),
  },
  methods: {
    ...mapActions([
      ADD_CHANNEL,
    ]),
    _goToAddedChannel(){
      this.$router.push({name: "chat",
                         params: {"channelname": this.form.channel}})
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
      this.$refs["form"].validate((is_valid) => {
        if (! is_valid) {
          return
        }
        this.ADD_CHANNEL({file: this.file,
                          channel: this.form.channel,
                          headers: this.header})
          .then(succeed => {
            if(succeed){
              this.addChannelSucceeded()
              return
            }
            this.addChannelFailed()
          })
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
