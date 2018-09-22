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
            trigger: 'blur'
          },
          {
            message: "Please dont input space only",
            whitespace: true,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: "password is required",
            trigger: 'blur'
          },
          {
            min: 8,
            max: 24,
            message: "password must be between 8 to 24 characters",
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    ...mapActions([
      REGISTER_USER,
    ]),
    registration_succeeded() {
      this.$notify({
        title: "Success!",
        message: "Registration succeeded",
        type: 'success'
      });
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
