import { mapActions } from 'vuex'
import { REGISTER_USER } from '@/store/mutation-types'
export default {
  name: "register-form",
  data() {
    return {
      username: "",
      password: "",
      disabled: false,
    }
  },
  methods: {
    ...mapActions([
      REGISTER_USER,
    ]),
    register() {
      this.REGISTER_USER({"username": this.username,
                          "password": this.password})
    }
  }
}
