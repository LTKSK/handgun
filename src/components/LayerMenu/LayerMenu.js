import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  GET_LAYERS,
  UPDATE_LAYERS
} from '@/store/mutation-types'
import store from "@/store"

export default {
  name: 'layer-menu',
  data() {
    return {}
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

