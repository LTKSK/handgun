import { SET_MESSAGE, GET_CHANNELS } from './mutation-types'

export default {
    [SET_MESSAGE]({ commit }, message) {
        commit(SET_MESSAGE, message)
    },
    [GET_CHANNELS]({ commit }) {
        // TODO: Backend is not implimented yet.
        // Below list is dummy channnels.
        commit(GET_CHANNELS, ["image", "movie"])
    }
}
