<template>
  <el-button type="info" v-on:click="logout">
    Logout
  </el-button>
</template>

<script>
import { mapActions } from 'vuex'
import { LOGOUT } from '@/store/mutation-types'
export default {
  name: 'logout-button',
  data() {
    return {}
  },
  methods: {
    ...mapActions([
      LOGOUT,
    ]),
    logout() {
      this.$confirm(
        "Do you want to logout?",
        "Warning",
        {
          confirmButtonText: "Logout",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
      .then(() => {
        this.LOGOUT()
          .then(() => {
            this.$router.push({path: "/"})
          })
      })
      .catch(error => {})
    },
  }
}
</script>

<style scoped>
</style>
