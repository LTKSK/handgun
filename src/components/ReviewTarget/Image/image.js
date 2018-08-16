import { createShaderProgram, initWebGL } from "../modules/webglutil"
export default {
  name: "image-item",
  methods: {
    setupTexture(gl) {
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
    },

    drawImage(gl) {
      const program = createShaderProgram(gl, "#image-vs", "#image-fs")
      this.setupTexture(gl)
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
    },

    drawReviewTarget() {
      const canvas = document.querySelector("#glcanvas")
      const gl = initWebGL(canvas)
      this.gl = gl
      // const gl = this.initWebGL()
      this.drawImage(gl)
    },

    drawLines(gl) {
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

      const vertices = new Float32Array(this.vertices)
      const vertex_count = vertices.length / 3
      const color_list = []
      for (let i=0; i<vertex_count; ++i) {
        Array.prototype.push.apply(color_list, this.color)
      }
      const colors = new Float32Array(color_list)

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW)
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW)
      // draw
      for (let index=0; index<this.start_indices.length; ++index){
        const first = this.start_indices[index]
        const last = this.vertex_counts[index]
        gl.drawArrays(gl.LINE_STRIP, first, last)
      }
      gl.flush()
    },

    eventSetup() {
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
  },
  data() {
    return {
      gl: null,
      name: "review",
      on_click: false,
      vertices: [],
      vertex_count: 0,
      current_index: 0,
      start_indices: [],
      vertex_counts: [],
      color: [1.0, 1.0, 1.0, 1.0],
    }
  },
  mounted() {
    this.drawReviewTarget()
    this.eventSetup()
  }
}