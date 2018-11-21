import ChannelList from '@/components/ChannelList'
import MessageList from '@/components/MessageList'
import ReviewTarget from '@/components/ReviewTarget'
import {
  fetchLayer,
  putLayer,
} from "@/module/webapiRepository"
import { Layer } from "@/module/layer"

export default {
  name: 'review-page',
  data() {
    return {
      layer: null,
      show_layer_menu: false
    }
  },
  computed: {
    channel() {
      return this.$route.params.channelname
    }
  },
  components: {
    'review-target': ReviewTarget,
    'channel-list': ChannelList,
    'message-list': MessageList,
  },
  methods: {
    _saveSucceeded() {
      this.$notify({
        title: "Success!",
        message: "Save layer data succeeded",
        type: "success"
      })
    },
    _saveFailed() {
      this.$notify({
        title: "Failed!",
        message: "Registration failed",
        type: "error"
      })
    },
    saveLayer() {
      putLayer(this.$route.params.channelname, this.layer)
        .then(succeeded => {
          if (succeeded) {
            this._saveSucceeded()
            return
          }
          this._saveFailed()
        })
    },
    _layerUpdate(layer) {
      // update layer for 'watch'.
      this.layer = new Layer(layer.color,
                             layer.polygon_count,
                             layer.vertices,
                             layer.start_indices,
                             layer.vertex_counts)
    },
    undoLayer() {
      this.layer.undo()
      this._layerUpdate(this.layer)
    },
    resetLayer() {
      this.layer.reset()
      this._layerUpdate(this.layer)
    },
  },
  mounted() {
    fetchLayer(this.$route.params.channelname)
      .then(layer => {
        if (Object.keys(layer).length == 0){
          // create default layer.
          this.layer = new Layer([1.0, 1.0, 1.0, 1.0], 0, [], [], [])
        }
        else {
          this._layerUpdate(layer)
        }
      })
  }
}
