import {
  drawImage,
  drawLines,
  initWebGL
} from "../Module/webglutil"
import { Layer } from "../Module/layer"
export default {
  name: "image-item",
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
        drawImage(this.gl)
        drawLines(this.gl, current_layer)
      })
    },
    saveLayer() {
      // todo
      // save layer data to db
    },
    resetLayer() {
      // overwrite line polygons by drawImage
      drawImage(this.gl)
      this.layers[this.current_layer_num].reset()
    }
  },

  data() {
    return {
      gl: null,
      name: "review",
      on_click: false,
      current_layer_num: 0,
      layers: [new Layer()],
    }
  },

  mounted() {
    const canvas = document.querySelector("#glcanvas")
    this.gl = initWebGL(canvas)
    drawImage(this.gl)
    this.eventSetup()
  }
}