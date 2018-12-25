import { fetchReviewTarget } from "@/module/webapiRepository"
import { mapGetters } from 'vuex'

export default {
  name: 'channel-thumbnail',
  props: ["channel"],
  data() {
    return {
      thumbnail: null,
    }
  },
  computed: {
    ...mapGetters([
      "header"
    ]),
  },
  methods: {
    _resize_image(image, width, height) {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")

      if(image.width > image.height) {
        const aspect_ratio = image.height / image.width
        height = Math.ceil(height * aspect_ratio)
      } else {
        const aspect_ratio = image.width / image.height
        width = Math.ceil(width * aspect_ratio)
      }
      canvas.width = width
      canvas.height = height

      context.drawImage(image, 0, 0, width, height)
      return canvas.toDataURL()
    },
  },
  mounted() {
    fetchReviewTarget(this.channel, this.header)
      .then(blob => {
        const image = new Image()
        image.src = URL.createObjectURL(blob)
        image.onload = () => {
          this.thumbnail = this._resize_image(image, 256, 256)
        }
      }
    )
  }
}