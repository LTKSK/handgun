import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  GET_LAYERS,
  UPDATE_LAYERS
} from '@/store/mutation-types'
import { Layer } from "@/module/layer"
import store from "@/store"

export default {
  name: 'layer-menu',
  data() {
    return {
      // this flag is in layer add process or not.
      layer_adding: false
    }
  },
  computed: {
    ...mapGetters([
      "layers"
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
      if (! layer_adding) {
        return
      }
      // store.commit(UPDATE_LAYERS, this.layers)
    },
    startAdd() {
      this.layer_adding = true
    },
    cancelAdd() {
      this.layer_adding = false
    },
    addLayer() {
      this.layer_adding = true
      // this.layers.push(new Layer([1.0, 1.0, 1.0, 1.0], 0, [], [], []))
      // store.commit(UPDATE_LAYERS, this.layers)
    },
    saveLayers() {
      this.UPDATE_LAYERS({"channel_name": this.$route.params.channelname,
                          "layers": this.layers})
        .then(() => {
          this._saveSucceeded()
        }).catch(err => {
          this._saveFailed()
        })
    },
    undoLayer() {
      this.layers[0].undo()
      store.commit(UPDATE_LAYERS, this.layers)
    },
    resetLayer() {
      this.layers[0].reset()
      store.commit(UPDATE_LAYERS, this.layers)
    },
  },
  mounted() {
    this.GET_LAYERS(this.$route.params.channelname)
  }
}

