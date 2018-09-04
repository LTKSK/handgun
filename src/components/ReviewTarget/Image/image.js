import {
  drawImage,
  drawLines,
  initWebGL
} from "../webglutil"
import { getReviewTarget } from "@/module/webappRepository"
import { Layer } from "../layer"
export default {
  name: "image-item",

  data() {
    return {
      gl: null,
      on_click: false,
      current_image_src: null,
      current_layer_num: 0,
      layers: [new Layer()],
    }
  },

  methods: {
    eventSetup() {
      const canvas = document.querySelector("#glcanvas")
      // setup mouse callbacks
      canvas.addEventListener("mouseup", () => {
        this.on_click = false
        this.layers[this.current_layer_num].beginAddPolygon()
      })
      canvas.addEventListener("mousedown", () => {
        this.on_click = true
        this.layers[this.current_layer_num].endAddPolygon()
      })
      canvas.addEventListener("mousemove", (event) => {
        if(! this.on_click) {
          return
        }
        const current_layer = this.layers[this.current_layer_num]
        current_layer.addVertexFromMouseEvent(event)
        drawImage(this.gl, this.current_image_src)
        drawLines(this.gl, current_layer)
      })
    },
    saveLayer() {
      // todo
      // save layer data to db
    },
    resetLayer() {
      // overwrite line polygons by drawImage
      drawImage(this.gl, this.current_image_src)
      this.layers[this.current_layer_num].reset()
    },
  },

  mounted() {
    const canvas = document.querySelector("#glcanvas")
    this.gl = initWebGL(canvas)
    this.eventSetup()
    getReviewTarget(this.$route.params.channelname)
    .then(blob => {
      const reader = new FileReader()
      reader.onload = loaded_data => {
        this.current_image_src = loaded_data.target.result
        console.log(this.current_image_src)
        this.resetLayer()
      }
      reader.readAsDataURL(blob)
    })
  }
}