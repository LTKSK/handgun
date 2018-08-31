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
    },
    fileSelected(file_data) {
      const files = file_data.target.files || file_data.dataTransfer.files
      if (files.length == 0) {
        return
      }
      const reader = new FileReader()
      reader.onload = loaded_data => {
        this.to_upload_file = loaded_data.target.result
        // When review target is loaded, do resetLayer
        const target = document.querySelector("#review-target-img")
        target.onload = () => {
          this.resetLayer()
        }
      }
      reader.readAsDataURL(files[0])
    }
  },

  data() {
    return {
      gl: null,
      on_click: false,
      to_upload_file: null,
      current_layer_num: 0,
      layers: [new Layer()],
    }
  },

  mounted() {
    const canvas = document.querySelector("#glcanvas")
    this.gl = initWebGL(canvas)
    this.eventSetup()
  }
}