const setupTexture = (gl, texture_src_id) => {
  const textureImage = new Image()
  // get image source from id "rtimg(review target image)"
  textureImage.src = document.querySelector(texture_src_id).src
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
  gl.texImage2D(gl.TEXTURE_2D,    //format
                0,                //mipmap level
                gl.RGBA,          //internal color format
                gl.RGBA,          //color format
                gl.UNSIGNED_BYTE, //data format
                textureImage)     //texture
  gl.generateMipmap(gl.TEXTURE_2D)
}

const createShaderProgram = (gl, vs_id, fs_id) => {
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

export function drawImage(gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  const program = createShaderProgram(gl, "#image-vs", "#image-fs")
  setupTexture(gl, "#review-target-img")
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

export function drawLines(gl, layer) {
  const program = createShaderProgram(gl, "#line-vs", "#line-fs")
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

  const vertices = new Float32Array(layer.vertices)
  const vertex_count = vertices.length / 3
  const color_list = []
  for (let i=0; i<vertex_count; ++i) {
    Array.prototype.push.apply(color_list, layer.color)
  }
  const colors = new Float32Array(color_list)

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW)
  // draw
  for (let index=0; index<layer.start_indices.length; ++index){
    const first = layer.start_indices[index]
    const last = layer.vertex_counts[index]
    gl.drawArrays(gl.LINE_STRIP, first, last)
  }
  gl.flush()
}

// initialize web gl instance
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
  return gl
}
