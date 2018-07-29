import {
    SET_MESSAGE,
    GET_CHANNELS
} from './mutation-types'

export default {
    [SET_MESSAGE](state, message) {
        state.messages.push(message)
    },
    [GET_CHANNELS](state, channels) {
        state.channels = channels
    }
}
