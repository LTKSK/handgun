import {
  registerUser,
} from '@/module/webapiRepository'
export default {
  name: "register-form",
  data() {
    return {
      file: null,
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
    fileSelected(file) {
      this.file = URL.createObjectURL(file.raw)
    },
    _goToLoginForm() {
      this.$router.push({path: "/login"})
    },
    _registrationSucceeded() {
      this.$notify({
        title: "Success!",
        message: "Registration succeeded",
        type: "success"
      }).onClose = this._goToLoginForm
    },
    _registrationFailed() {
      this.$notify({
        title: "Failed!",
        message: "Registration failed",
        type: "error"
      })
    },
    register(form_name) {
      this.$refs[form_name].validate((is_valid) => {
        if (is_valid) {
          registerUser(this.form.username, this.form.password)
            .then(succeeded => {
              if (succeeded) {
                this._registrationSucceeded()
              } else {
                this._registrationFailed()
              }
            })
        }
      });
    }
  }
}
