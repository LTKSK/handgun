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
      const program = gl.createProgram()
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS)
      if (!linkStatus) {
        const info = gl.getProgramInfoLog(program)
        console.log(info)
      }
      gl.useProgram(program)

      //prepare buffers
      const vertexBuffer = gl.createBuffer()
      const colorBuffer = gl.createBuffer()
      const vertexAttribLocation = gl.getAttribLocation(program, "vertexPosition")
      const colorAttribLocation = gl.getAttribLocation(program, "color")
      const VERTEX_SIZE = 3
      const COLOR_SIZE = 4
      // should bind before binding buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      // enable 'in' variables
      gl.enableVertexAttribArray(vertexAttribLocation)
      gl.vertexAttribPointer(vertexAttribLocation, VERTEX_SIZE, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
      gl.enableVertexAttribArray(colorAttribLocation)
      gl.vertexAttribPointer(colorAttribLocation, COLOR_SIZE, gl.FLOAT, false, 0, 0)

      const vertices = new Float32Array([
        -0.5,  0.5, 0.0,
        -0.5, -0.5, 0.0,
         0.5,  0.5, 0.0,
        -0.5, -0.5, 0.0,
         0.5, -0.5, 0.0,
         0.5,  0.5, 0.0
      ])
      const colors = new Float32Array([
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
      ])

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)
      const VERTEX_NUMS = 6
      gl.drawArrays(gl.TRIANGLES, 0, VERTEX_NUMS)
      gl.flush()
    }
    const initWebGL = canvas => {
      let gl = null
      try {
        gl = canvas.getContext("webgl2")
      }
      catch (e) { console.log(e) }
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
        initShaders(gl)
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