import { fetchReviewTarget } from "@/module/webapiRepository"

export default {
  name: 'channel-thumbnail',
  props: ["channel"],
  data() {
    return {
      thumbnail: null,
    }
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
    fetchReviewTarget(this.channel)
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