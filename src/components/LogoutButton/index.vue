<template>
  <el-button type="primary" v-on:click="logout">
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
      this.LOGOUT()
        .then(() => {
          this.$router.push({path: "/"})
        })
    },
  }
}
</script>

<style scoped>
</style>
