import { mapGetters } from 'vuex'

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
}