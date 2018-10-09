import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const state = {
    messages: [],
    channels: [],
    logged_in_user: null,
    users: null,
    jwt: "",
    icons: {},
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins: [createPersistedState()]
})
