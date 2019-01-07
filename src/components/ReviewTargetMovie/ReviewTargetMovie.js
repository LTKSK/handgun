import {
  drawImage,
  drawLines,
  initWebGL
} from "@/module/webglutil"
import { fetchReviewTarget } from "@/module/webapiRepository"
import { mapGetters } from 'vuex'

export default {
  name: "movie-item",
  data() {
    return {
      gl: null,
      on_click: false,
      movie: null
    }
  }
}
