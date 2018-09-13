const setupTexture = (gl, texture_image) => {
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
  gl.texImage2D(gl.TEXTURE_2D,    //format
                0,                //mipmap level
                gl.RGBA,          //internal color format
                gl.RGBA,          //color format
                gl.UNSIGNED_BYTE, //data format
                texture_image)    //texture
  gl.generateMipmap(gl.TEXTURE_2D)
}

const createShaderProgram = (gl, vs_id, fs_id) => {
  const vertex_shader_source = document.querySelector(vs_id).text
  const fragment_shader_source = document.querySelector(fs_id).text
  // create shader program
  const vertex_shader= gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertex_shader, vertex_shader_source)
  gl.compileShader(vertex_shader)
  // check compile status
  const vertex_shader_compile_status = gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS)
  if(!vertex_shader_compile_status) {
    const info = gl.getShaderInfoLog(vertex_shader)
    console.log(info)
  }
  const fragment_shader= gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragment_shader, fragment_shader_source)
  gl.compileShader(fragment_shader)
  // check compile status
  const fragment_shader_compile_status = gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS)
  if(!fragment_shader_compile_status) {
    const info = gl.getShaderInfoLog(fragment_shader)
    console.log(info)
  }
  const program = gl.createProgram()
  gl.attachShader(program, vertex_shader)
  gl.attachShader(program, fragment_shader)
  gl.linkProgram(program)
  const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linkStatus) {
    const info = gl.getProgramInfoLog(program)
    console.log(info)
  }
  gl.useProgram(program)
  return program
}

export function drawImage(gl, image) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)
  gl.depthFunc(gl.LEQUAL)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  const program = createShaderProgram(gl, "#image-vs", "#image-fs")
  // get image source from id "review target image"
  setupTexture(gl, image)
  //prepare buffers
  const vertex_buffer = gl.createBuffer()
  const index_buffer = gl.createBuffer()
  const vertex_attrib_location = gl.getAttribLocation(program, "vertexPosition")
  const textureAttribLocation = gl.getAttribLocation(program, "texCoord")
  const VERTEX_SIZE = 3
  const TEXTURE_SIZE = 2
  const STRIDE = (VERTEX_SIZE + TEXTURE_SIZE) * Float32Array.BYTES_PER_ELEMENT
  const POSITION_OFFSET = 0
  // texture_offset is on after the position so *3
  const TEXTURE_OFFSET = 3 * Float32Array.BYTES_PER_ELEMENT
  // should bind before binding buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
  // enable 'in' variables
  gl.enableVertexAttribArray(vertex_attrib_location)
  gl.enableVertexAttribArray(textureAttribLocation)
  gl.vertexAttribPointer(vertex_attrib_location, VERTEX_SIZE, gl.FLOAT, false, STRIDE, POSITION_OFFSET)
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
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW)

  // draw
  gl.drawElements(gl.TRIANGLES, indexes.length, gl.UNSIGNED_SHORT, 0)
  gl.flush()
}

export function drawLines(gl, layer) {
  const program = createShaderProgram(gl, "#line-vs", "#line-fs")
  //prepare buffers
  const vertex_buffer = gl.createBuffer()
  const color_buffer = gl.createBuffer()
  const line_position_attrib_location = gl.getAttribLocation(program, "linePosition")
  const color_attrib_location = gl.getAttribLocation(program, "color")
  const LINE_POSITION_SIZE = 2
  const COLOR_SIZE = 4
  // should bind before binding buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
  // enable 'in' variables
  gl.enableVertexAttribArray(line_position_attrib_location)
  gl.vertexAttribPointer(line_position_attrib_location, LINE_POSITION_SIZE, gl.FLOAT, false, 0, 0)

  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)
  gl.enableVertexAttribArray(color_attrib_location)
  gl.vertexAttribPointer(color_attrib_location, COLOR_SIZE, gl.FLOAT, false, 0, 0)

  const vertices = new Float32Array(layer.vertices)
  const color_list = []
  for (let i=0; i<vertices.length / 2; ++i) {
    Array.prototype.push.apply(color_list, layer.color)
  }
  const colors = new Float32Array(color_list)
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)
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
