import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  GET_LAYERS,
  UPDATE_LAYERS,
  SET_CURRENT_LAYER
} from '@/store/mutation-types'
import { Layer } from "@/module/layer"
import store from "@/store"

export default {
  name: 'layer-menu',
  data() {
    return {
      // this flag is in layer add process or not.
      layer_adding: false,
      add_layer_color: [1.0, 1.0, 1.0, 1.0]
    }
  },
  computed: {
    ...mapGetters([
      "layers",
      "current_layer"
    ]),
  },
  methods: {
    ...mapActions([
      GET_LAYERS,
      UPDATE_LAYERS
    ]),
    _saveSucceeded() {
      this.$notify({
        title: "Success!",
        message: "Save layers data succeeded",
        type: "success"
      })
    },
    _saveFailed() {
      this.$notify({
        title: "Failed!",
        message: "Save layers data failed",
        type: "error"
      })
    },
    setColor(color) {
      this.add_layer_color = color
    },
    startAdd() {
      this.layer_adding = true
    },
    cancelAdd() {
      this.layer_adding = false
    },
    addLayer() {
      this.layer_adding = true
      this.layers.push(new Layer(this.add_layer_color, 0, [], [], []))
      store.commit(UPDATE_LAYERS, this.layers)
    },
    saveLayers() {
      this.UPDATE_LAYERS({"channel_name": this.$route.params.channelname,
                          "layers": this.layers})
        .then(() => {
          this._saveSucceeded()
        }).catch(_ => {
          this._saveFailed()
        })
    },
    undoLayer() {
      this.current_layer.undo()
      store.commit(SET_CURRENT_LAYER, this.current_layer)
    },
    resetLayer() {
      this.current_layer.reset()
      store.commit(SET_CURRENT_LAYER, this.current_layer)
    },
  },
  mounted() {
    this.GET_LAYERS(this.$route.params.channelname)
  }
}

