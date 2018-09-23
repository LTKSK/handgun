import { mapActions } from 'vuex'
import { REGISTER_USER } from '@/store/mutation-types'
export default {
  name: "register-form",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "username is required",
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
        ],
        password: [
          {
            required: true,
            message: "password is required",
            trigger: "blur"
          },
          {
            min: 8,
            message: "password must be higher than 8 characters",
            trigger: "blur"
          }
        ],
      }
    }
  },
  methods: {
    ...mapActions([
      REGISTER_USER,
    ]),
    _go_to_login_form() {
      this.$router.push({path: "/login"})
    },
    registration_succeeded() {
      this.$notify({
        title: "Success!",
        message: "Registration succeeded",
        type: 'success'
      }).onClose = this._go_to_login_form
    },
    register(form_name) {
      this.$refs[form_name].validate((is_valid) => {
        if (is_valid) {
          this.REGISTER_USER({"username": this.form.username,
                              "password": this.form.password})
          this.registration_succeeded()
        } else {
          return false;
        }
      });
    }
  }
}
