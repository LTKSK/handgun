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
    '$route': 'setup',
  },
  data() {
    return {
      gl: null,
      on_click: false,
      current_image: null,
      current_layer_num: 0,
      layer: null,
    }
  },
  methods: {
    mouseup(){
      this.on_click = false
      this.layer.beginAddPolygon()
    },
    mousedown(){
      this.on_click = true
      this.layer.endAddPolygon()
    },
    mousemove(event){
      if(!this.on_click) {
        return
      }
      this.layer.addVertexFromMouseEvent(event)
      drawImage(this.gl, this.current_image)
      drawLines(this.gl, this.layer)
    },
    canvasSetup() {
      // webgl setup
      const canvas = document.querySelector(".glcanvas")
      const canvas_container = document.querySelector(".canvas-container")

      // Width -4 because canvas-container's padding is 2px*(right+left)
      const container_width = canvas_container.clientWidth - 4
      canvas.width = container_width
      canvas.height = container_width * this.current_image.height / this.current_image.width
      this.gl = initWebGL(canvas)
      // setup mouse callbacks
      canvas.addEventListener("mouseup", this.mouseup)
      canvas.addEventListener("mousedown", this.mousedown)
      canvas.addEventListener("mousemove", this.mousemove)
    },
    saveLayer() {
      putLayer(this.$route.params.channelname, this.layer)
    },
    resetLayer() {
      this.layer.reset()
      // overwrite line polygons by drawImage
      drawImage(this.gl, this.current_image)
    },
    setup() {
      // review-target setup
      fetchReviewTarget(this.$route.params.channelname)
        .then(blob => {
          this.current_image = new Image()
          const url = URL.createObjectURL(blob)
          this.current_image.src = url
          return new Promise(resolve => {
            this.current_image.onload = () => {
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
            drawImage(this.gl, this.current_image)
            drawLines(this.gl, this.layer)
          })
      })
    }
  },
  mounted() {
    this.setup()
  }
}