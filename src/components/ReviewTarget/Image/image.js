import {
  drawImage,
  drawLines,
  initWebGL
} from "../webglutil"
import { fetchReviewTarget } from "@/module/webapiRepository"
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
      layer: new Layer(),
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
    canvasEventSetup(canvas) {
      // setup mouse callbacks
      canvas.addEventListener("mouseup", this.mouseup)
      canvas.addEventListener("mousedown", this.mousedown)
      canvas.addEventListener("mousemove", this.mousemove)
    },
    saveLayer() {
      // todo: save layer data to db
    },
    resetLayer() {
      this.layer.reset()
      // overwrite line polygons by drawImage
      drawImage(this.gl, this.current_image)
    },
    setup() {
      const canvas = document.querySelector(".glcanvas")
      this.gl = initWebGL(canvas)
      this.canvasEventSetup(canvas)
      fetchReviewTarget(this.$route.params.channelname)
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