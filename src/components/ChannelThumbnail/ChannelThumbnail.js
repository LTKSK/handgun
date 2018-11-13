import { fetchReviewTarget } from "@/module/webapiRepository"

export default {
  name: 'channel-thumbnail',
  props: ["channel"],
  data() {
    return {
      thumbnail: null,
      loaded: false
    }
  },
  mounted() {
    fetchReviewTarget(this.channel)
      .then(blob => {
        this.thumbnail = new Image()
        const url = URL.createObjectURL(blob)
        this.thumbnail.src = url
        this.thumbnail.onload = () => {
          this.loaded = true
        }
      }
    )
  }
}