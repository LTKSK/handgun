import { SET_MESSAGE, GET_CHANNELS } from './mutation-types'

export default {
    [SET_MESSAGE]({ commit }, message) {
        const message_data = {
          "value": message,
          "date": "2018-08-01T12:00:00.110Z",
          "user": "Anonymouse",
        }
        commit(SET_MESSAGE, message_data)
    },
    [GET_CHANNELS]({ commit }) {
        // TODO: Backend is not implimented yet.
        // Below list is dummy channnels.
        commit(GET_CHANNELS, ["image", "movie"])
    }
}
