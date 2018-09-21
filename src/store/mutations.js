import {
  REGISTER_USER,
  GET_MESSAGES,
  ADD_MESSAGE,
  GET_CHANNELS,
  ADD_CHANNEL,
} from './mutation-types'

export default {
  [REGISTER_USER](state, user) {
    state.user = user
  },
  [GET_MESSAGES](state, messages) {
    state.messages = messages
  },
  [ADD_MESSAGE](state, message) {
    state.messages.push(message)
  },
  [GET_CHANNELS](state, channels) {
    state.channels = channels
  },
  [ADD_CHANNEL](state, channel) {
    state.channels.push(channel)
  }
}
