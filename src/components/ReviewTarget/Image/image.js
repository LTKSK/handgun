export default {
  name: "image-item",
  data() {
    const initShaders = (gl) => {
      const vertexShaderSource = document.querySelector("#vs").text
      const fragmentShaderSource = document.querySelector("#fs").text
      // create shader program
      const vertexShader= gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vertexShader, vertexShaderSource)
      gl.compileShader(vertexShader)
      // check compile status
      const vShaderComplieStatus = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)
      if(!vShaderComplieStatus) {
        const info = gl.getShaderInfoLog(vertexShader)
        console.log(info)
      }

      const fragmentShader= gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fragmentShader, fragmentShaderSource)
      gl.compileShader(fragmentShader)
      // check compile status
      const fShaderComplieStatus = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)
      if(!fShaderComplieStatus) {
        const info = gl.getShaderInfoLog(fragmentShader)
        console.log(info)
      }
      const shaderProgram = gl.createProgram()
      gl.attachShader(shaderProgram, vertexShader)
      gl.attachShader(shaderProgram, fragmentShader)
      gl.linkProgram(shaderProgram)
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Shader initialize failed")
      }
    }
    const initWebGL = canvas => {
      let gl = null
      try {
        gl = canvas.getContext("webgl2")
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
      canvas.width = 640
      canvas.height = 480
      const gl = initWebGL(canvas)
      if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      }
      initShaders(gl)
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