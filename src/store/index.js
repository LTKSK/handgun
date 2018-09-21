import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    messages: [],
    channels: [],
    user: null,
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
