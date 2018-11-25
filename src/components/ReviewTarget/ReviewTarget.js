import {
  drawImage,
  drawLines,
  initWebGL
} from "@/module/webglutil"
import { fetchReviewTarget } from "@/module/webapiRepository"
import { mapGetters } from 'vuex'

export default {
  name: "image-item",
  watch:{
    // watch changing route. because this component needs update canvas image.
    "$route": "setup",
    // watch layers attributes.
    "layers": "draw",
  },
  data() {
    return {
      gl: null,
      on_click: false,
      image: null,
      current_layer_num: 0,
    }
  },
  computed: {
    ...mapGetters([
      "layers"
    ]),
  },
  methods: {
    draw() {
      if(this.gl === null) {
        return
      }
      drawImage(this.gl, this.image)
      drawLines(this.gl, this.layers[0])
    },
    _mouseup() {
      // if this.on_click is already false, do nothing.
      if(! this.on_click) {
        return
      }
      this.on_click = false
      this.layers[0].endAddPolygon()
    },
    _mousedown() {
      this.on_click = true
      this.layers[0].beginAddPolygon()
    },
    _mouseout() {
      if(! this.on_click) {
        return
      }
      this.layers[0].addVerticesFromMouseEvent(event)
      this.layers[0].endAddPolygon()
      // if mouse is out, draw lines to border of canvas and on_click to false.
      drawImage(this.gl, this.image)
      drawLines(this.gl, this.layers[0])
      this.on_click = false
    },
    _mousemove(event) {
      if(! this.on_click) {
        return
      }
      this.layers[0].addVerticesFromMouseEvent(event)
      drawImage(this.gl, this.image)
      drawLines(this.gl, this.layers[0])
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
      canvas.addEventListener("mouseout", this._mouseout)
      canvas.addEventListener("mousedown", this._mousedown)
      canvas.addEventListener("mousemove", this._mousemove)
    },
    setup() {
      // review-target setup
      fetchReviewTarget(this.$route.params.channelname)
        .then(blob => {
          this.image = new Image()
          const url = URL.createObjectURL(blob)
          this.image.src = url
          this.image.onload = () => {
            this.canvasSetup()
            drawImage(this.gl, this.image)
            drawLines(this.gl, this.layers[0])
          }
      })
    }
  },
  mounted() {
    this.setup()
  }
}