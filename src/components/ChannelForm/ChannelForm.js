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
