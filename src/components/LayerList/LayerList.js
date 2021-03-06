import { mapGetters } from 'vuex'
import { SET_CURRENT_LAYER } from '@/store/mutation-types'
import store from "@/store"

export default {
  name: 'layer-list',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      "layers"
    ])
  },
  methods: {
    setCurrentLayer(layer_index) {
      store.commit(SET_CURRENT_LAYER, this.layers[layer_index])
    },
    _isSameColor(layer, color) {
      return layer.color[0] === color[0]
             && layer.color[1] === color[1]
             && layer.color[2] === color[2]
    },
    layerColor(layer) {
      if(this._isSameColor(layer, [1, 0, 0, 1])) { return "red-button" }
      if(this._isSameColor(layer, [0, 1, 0, 1])) { return "green-button" }
      if(this._isSameColor(layer, [0, 0, 1, 1])) { return "blue-button" }
      if(this._isSameColor(layer, [1, 1, 0, 1])) { return "yellow-button" }
      if(this._isSameColor(layer, [0, 1, 1, 1])) { return "sian-button" }
      if(this._isSameColor(layer, [1, 0, 1, 1])) { return "magenta-button" }
      if(this._isSameColor(layer, [0, 0, 0, 1])) { return "black-button" }
      if(this._isSameColor(layer, [1, 1, 1, 1])) { return "white-button" }
    }
  }
}