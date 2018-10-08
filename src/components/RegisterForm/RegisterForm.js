import {
  postUser,
  postUserIcon,
} from '@/module/webapiRepository'
export default {
  name: "register-form",
  data() {
    return {
      image_src: null,
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
    _resize_image(image, mime_type, width, height) {
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext("2d")
      context.drawImage(image, 0, 0, width, height)
      return canvas.toDataURL(mime_type)
    },
    fileSelected(file) {
      const image = new Image()
      image.src = URL.createObjectURL(file.raw)
      image.onload = () => {
        this.image_src = new Image()
        this.image_src = this._resize_image(image, file.raw.type, 64, 64)
      }
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
    _mimetype_from_dataurl(url) {
      return url.split(";")[0].replace("data:", "")
    },
    _image_src_to_blob(image_src) {
      const bin = atob(image_src.split(",")[1])
      const buffer = new Uint8Array(bin.length)
      for (let i=0; i<bin.length; ++i) {
        buffer[i] = bin.charCodeAt(i)
      }
      return new Blob([buffer.buffer],
                      {type: this._mimetype_from_dataurl(image_src)})
    },
    register(form_name) {
      this.$refs[form_name].validate((is_valid) => {
        if (is_valid) {
          postUser(this.form.username, this.form.password)
            .then(succeeded => {
              if (succeeded) {
                const image_data = this._image_src_to_blob(this.image_src)
                return postUserIcon(this.form.username, image_data)
              }
              return false
            })
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
