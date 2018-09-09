export class Layer {
  constructor(color, vertices, polygon_count, start_indices, vertex_counts) {
    this.color = color
    this.vertices = vertices
    this.polygon_count = polygon_count
    this.start_indices = start_indices
    this.vertex_counts = vertex_counts
  }

  reset() {
    this.color = [1.0, 1.0, 1.0, 1.0]
    this.vertices = []
    this.polygon_count = 0
    this.start_indices = []
    this.vertex_counts = []
  }

  beginAddPolygon() {
    ++this.polygon_count
  }

  endAddPolygon() {
    this.vertex_counts.push(0)
    this.start_indices.push(this.vertices.length / 2)
  }

  addVertexFromMouseEvent(event) {
    ++this.vertex_counts[this.polygon_count]
    // current potisions normalized by canvas -0.5~0.5
    const rect = event.target.getBoundingClientRect()
    const current_x = event.clientX - rect.left
    const current_y = event.clientY - rect.top
    this.vertices.push((current_x / event.target.width)*2.0-1.0)
    // to reverse y position because texture origin position is started from left upper
    this.vertices.push((1.0 - current_y / event.target.height)*2.0-1.0)
  }
}
