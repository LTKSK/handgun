export default {
  name: "login-form",
  data() {
    return {
      username: "",
      password: "",
      disabled: false,
    }
  },
  methods: {
    go_to_register_form() {
      this.$router.push("/register")
    },
    login(){

    }
  }
}
