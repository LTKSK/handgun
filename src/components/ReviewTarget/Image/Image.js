import {
  drawImage,
  drawLines,
  initWebGL
} from "../webglutil"
import {
  fetchReviewTarget,
  fetchLayer,
  putLayer,
} from "@/module/webapiRepository"
import { Layer } from "../layer"
export default {
  name: "image-item",
  watch:{
    "$route": "setup",
  },
  data() {
    return {
      gl: null,
      on_click: false,
      image: null,
      current_layer_num: 0,
      layer: null,
    }
  },
  methods: {
    _mouseup(){
      this.on_click = false
      this.layer.beginAddPolygon()
    },
    _mousedown(){
      this.on_click = true
      this.layer.endAddPolygon()
    },
    _mousemove(event){
      if(!this.on_click) {
        return
      }
      this.layer.addVertexFromMouseEvent(event)
      drawImage(this.gl, this.image)
      drawLines(this.gl, this.layer)
    },
    canvasSetup() {
      // webgl setup
      const canvas = document.querySelector(".glcanvas")
      const canvas_container = document.querySelector(".canvas-container")
      // Width -4 because canvas-container's padding is 2px*(right+left)
      const canvas_width = this.image.width > canvas_container.clientWidth
                           ? canvas_container.clientWidth - 4
                           : this.image.width

      canvas.width = canvas_width
      canvas.height = canvas_width * this.image.height / this.image.width
      this.gl = initWebGL(canvas)
      // setup mouse callbacks
      canvas.addEventListener("mouseup", this._mouseup)
      canvas.addEventListener("mousedown", this._mousedown)
      canvas.addEventListener("mousemove", this._mousemove)
    },
    _saveSucceeded() {
      this.$notify({
        title: "Success!",
        message: "Save layer data succeeded",
        type: "success"
      })
    },
    _saveFailed() {
      this.$notify({
        title: "Failed!",
        message: "Registration failed",
        type: "error"
      })
    },
    saveLayer() {
      putLayer(this.$route.params.channelname, this.layer)
        .then(succeeded => {
          if (succeeded) {
            this._saveSucceeded()
            return
          }
          this._saveFailed()
        })
    },
    resetLayer() {
      this.layer.reset()
      // overwrite line polygons by drawImage
      drawImage(this.gl, this.image)
    },
    setup() {
      // review-target setup
      fetchReviewTarget(this.$route.params.channelname)
        .then(blob => {
          this.image = new Image()
          const url = URL.createObjectURL(blob)
          this.image.src = url
          return new Promise(resolve => {
            this.image.onload = () => {
              resolve()
            }
          })
      // after image loaded.
      }).then(() => {
        // layer setup
        fetchLayer(this.$route.params.channelname)
          .then(layer => {
            if (Object.keys(layer).length == 0){
              this.layer = new Layer([1.0, 1.0, 1.0, 1.0], 0, [], [], [])
            }
            else {
              this.layer = new Layer(layer.color,
                                     layer.polygon_count,
                                     layer.vertices,
                                     layer.start_indices,
                                     layer.vertex_counts)
            }
            // canvas setup
            this.canvasSetup()
            // write loaded image and loaded layer.
            drawImage(this.gl, this.image)
            drawLines(this.gl, this.layer)
          })
      })
    }
  },
  mounted() {
    this.setup()
  }
}