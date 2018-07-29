export default {
  name: "image-item",
  data() {
    const initWebGL = canvas => {
      let gl = null
      try {
        gl = canvas.getContext("webgl")
      }
      catch (e) {
        console.log(e)
      }
      if (!gl) {
        alert("WebGLを初期化出来ませんでした。サポートされていないブラウザです")
      }
      return gl
    }
    const start = () => {
      const canvas = document.querySelector("#glcanvas")
      const gl = initWebGL(canvas)
      if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      }
    }
    return {
      name: "tmp",
      start: start,
    }
  },
  mounted() {
    this.start()
  }
}