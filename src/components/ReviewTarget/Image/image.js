import {
  drawImage,
  drawLines,
  initWebGL
} from "../webglutil"
import { getReviewTarget } from "@/module/webappRepository"
import { Layer } from "../layer"
export default {
  name: "image-item",
  watch:{
    '$route': 'setup',
  },
  data() {
    return {
      gl: null,
      on_click: false,
      current_image: null,
      current_layer_num: 0,
      layers: [new Layer()],
    }
  },
  methods: {
    canvasEventSetup(canvas) {
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
        drawImage(this.gl, this.current_image)
        drawLines(this.gl, current_layer)
      })
    },
    saveLayer() {
      // todo
      // save layer data to db
    },
    resetLayer() {
      // overwrite line polygons by drawImage
      drawImage(this.gl, this.current_image)
      this.layers[this.current_layer_num].reset()
    },
    setup() {
      const canvas = document.querySelector(".glcanvas")
      this.gl = initWebGL(canvas)
      this.canvasEventSetup(canvas)
      getReviewTarget(this.$route.params.channelname)
        .then(blob => {
          this.current_image = new Image()
          const url = URL.createObjectURL(blob)
          this.current_image.src = url
          this.current_image.onload = () => {
            this.resetLayer()
          }
      })
    }
  },
  mounted() {
    this.setup()
  }
}