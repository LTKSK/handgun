class Layer {
  constructor(color) {
    this.color = color
    this.vertices = []
    this.vertex_count = 0
    this.current_index = 0
    this.start_indices = []
    this.vertex_counts = []
    this.message = ""
  }
  reset() {
    this.color = [1.0, 1.0, 1.0, 1.0]
    this.vertices = []
    this.vertex_count = 0
    this.current_index = 0
    this.start_indices = []
    this.vertex_counts = []
    this.message = ""
  }
  canvasEventSetup() {
    const canvas = document.querySelector("#glcanvas")
    // setup mouse callbacks
    canvas.addEventListener("mouseup", () => {
      this.on_click = false
      ++this.current_index
    })
    canvas.addEventListener("mousedown", () => {
      this.on_click = true
      this.vertex_counts.push(0)
      this.start_indices.push(this.vertex_count)
    })
    canvas.addEventListener("mousemove", (event) => {
      if(! this.on_click) {
        return
      }
      ++this.vertex_count
      ++this.vertex_counts[this.current_index]
      const rect = event.target.getBoundingClientRect()
      const current_x = event.clientX - rect.left
      const current_y = event.clientY - rect.top
      // current potisions normalized by canvas -0.5~0.5
      this.vertices.push((current_x / canvas.width)*2.0-1.0)
      // to reverse y position because texture origin position is started from left upper
      this.vertices.push((1.0 - current_y / canvas.height)*2.0-1.0)
      this.vertices.push(0.0)
      this.drawImage(this.gl)
      this.drawLines(this.gl)
    })
  }
  // message
  // line描画に必要な情報一覧
  //
}
const setupTexture = (gl) => {
  const textureImage = new Image()
  // get image source from id "rtimg(review target image)"
  textureImage.src = document.querySelector("#review-target-img").src
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
  gl.texImage2D(gl.TEXTURE_2D,    //format
                0,                //mipmap level
                gl.RGBA,          //internal color format
                gl.RGBA,          //color format
                gl.UNSIGNED_BYTE, //data format
                textureImage)     //texture
  gl.generateMipmap(gl.TEXTURE_2D)
}

const drawImage = (gl) => {
  const program = createShaderProgram(gl, "#image-vs", "#image-fs")
  setupTexture(gl)
  //prepare buffers
  const vertexBuffer = gl.createBuffer()
  const indexBuffer = gl.createBuffer()
  const vertexAttribLocation = gl.getAttribLocation(program, "vertexPosition")
  const textureAttribLocation = gl.getAttribLocation(program, "texCoord")
  const VERTEX_SIZE = 3
  const TEXTURE_SIZE = 2
  const STRIDE = (VERTEX_SIZE + TEXTURE_SIZE) * Float32Array.BYTES_PER_ELEMENT
  const POSITION_OFFSET = 0
  // texture_offset is on after the position so *3
  const TEXTURE_OFFSET = 3 * Float32Array.BYTES_PER_ELEMENT
  // should bind before binding buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // enable 'in' variables
  gl.enableVertexAttribArray(vertexAttribLocation)
  gl.enableVertexAttribArray(textureAttribLocation)
  gl.vertexAttribPointer(vertexAttribLocation, VERTEX_SIZE, gl.FLOAT, false, STRIDE, POSITION_OFFSET)
  gl.vertexAttribPointer(textureAttribLocation, TEXTURE_SIZE, gl.FLOAT, false, STRIDE, TEXTURE_OFFSET)
  // merge vertices and colors alternatively for to use interleaving
  const vertices = new Float32Array([
    // upper left
    -1.0,  1.0, 0.0,
      0.0, 0.0,
    // lower left
    -1.0, -1.0, 0.0,
      0.0, 1.0,
    // upper right
      1.0,  1.0, 0.0,
      1.0, 0.0,
    // lower right
      1.0, -1.0, 0.0,
      1.0, 1.0,
  ])
  const indexes = new Uint16Array([
    0, 1, 2,
    1, 3, 2
  ])

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW)

  // draw
  const indexSize = indexes.length
  gl.drawElements(gl.TRIANGLES, indexSize, gl.UNSIGNED_SHORT, 0)
  gl.flush()
}

export function createShaderProgram(gl, vs_id, fs_id) {
  const vertexShaderSource = document.querySelector(vs_id).text
  const fragmentShaderSource = document.querySelector(fs_id).text
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
  return program
}

export function initWebGL(canvas) {
  canvas.width = 640
  canvas.height = 640
  let gl = null
  try {
    gl = canvas.getContext("webgl2")
  }
  catch (e) { console.log(e) }
  if (!gl) {
    alert("WebGL initialize failed. This browser is not supported.")
    return
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  return gl
}
