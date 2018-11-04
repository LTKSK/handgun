<template>
  <el-button type="danger"
             v-on:click="deleteChannel">
    Delete Channel
  </el-button>
</template>

<script>
import { DELETE_CHANNEL } from '@/store/mutation-types'
import { deleteChannel } from '@/module/webapiRepository'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'delete-button',
  props: ["channel"],
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'header'
    ]),
  },
  methods: {
    ...mapActions([
      DELETE_CHANNEL
    ]),
    deleteChannel(){
      this.$confirm(
        `Do you want to delete ${this.channel}?`,
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(() => {
        this.DELETE_CHANNEL({channel: this.channel, headers: this.header})
          .then(() => {
            this.$notify({
              title: "Success!",
              message: `delete channel '${this.channel}' succeeded`,
              type: "success"
            }).onClose = () => {
              this.$router.push({path: "/channel"})
            }
          })
          .catch(error => {
            this.$notify({
              title: "Failed!",
              message: `delete channel failed. ${error.message}`,
              type: "error"
            })
          })
      })
    }
  },
}
</script>
