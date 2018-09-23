import { mapActions } from 'vuex'
import { LOGIN } from '@/store/mutation-types'
export default {
  name: "login-form",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    }
  },
  methods: {
    ...mapActions([
      LOGIN
    ]),
    go_to_register_form() {
      this.$router.push("/register")
    },
    _go_to_channel() {
      this.$router.push({path: "/channel"})
    },
    login_succeeded() {
      this.$notify({
        title: "Success!",
        message: "Login succeeded",
        type: 'success'
      }).onClose = this._go_to_channel
    },
    login(){
      this.LOGIN({username: this.form.username,
                  password: this.form.password})
      this.login_succeeded()
    }
  }
}
