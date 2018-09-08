import {
  drawImage,
  drawLines,
  initWebGL
} from "../webglutil"
import { getReviewTarget } from "@/module/webapiRepository"
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
    mouseup(){
      this.on_click = false
      this.layers[this.current_layer_num].beginAddPolygon()
    },
    mousedown(){
      this.on_click = true
      this.layers[this.current_layer_num].endAddPolygon()
    },
    mousemove(event){
      if(!this.on_click) {
        return
      }
      const current_layer = this.layers[this.current_layer_num]
      // console.log(current_layer)
      current_layer.addVertexFromMouseEvent(event)
      drawImage(this.gl, this.current_image)
      drawLines(this.gl, current_layer)
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
      this.layers[this.current_layer_num].reset()
      // overwrite line polygons by drawImage
      drawImage(this.gl, this.current_image)
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