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
    goToRegisterForm() {
      this.$router.push("/register")
    },
    _goToChannel() {
      this.$router.push({path: "/table"})
    },
    _loginSucceeded() {
      this.$notify({
        title: "Success!",
        message: "Login succeeded",
        type: 'success'
      }).onClose = this._goToChannel
    },
    _loginFailed(error) {
      this.$notify({
        title: "Failded!",
        message: `Login failed! ${error.message}`,
        type: 'error'
      })
    },
    login(){
      this.LOGIN({username: this.form.username,
                  password: this.form.password})
        .then(() => {
          this._loginSucceeded()
        })
        .catch(error => {
          this._loginFailed(error)
        })
    }
  }
}
