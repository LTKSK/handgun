<template>
  <el-button type="primary" v-on:click="LOGOUT">
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
  }
}
</script>

<style scoped>
</style>
