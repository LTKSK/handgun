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
    ]),
  },
  methods: {
    set_current_layer(layer_index) {
      console.log(layer_index)
      // store.commit(SET_CURRENT_LAYER, this.layers[layer_index])
    }
  }
}