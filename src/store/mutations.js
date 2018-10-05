import {
  LOGIN,
  GET_MESSAGES,
  ADD_MESSAGE,
  GET_CHANNELS,
  ADD_CHANNEL,
  ADD_ICON,
  GET_USERS,
} from './mutation-types'


export default {
  [LOGIN](state, payload) {
    state.jwt = payload.jwt
    state.user = payload.user
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
  },
  [ADD_ICON](state, payload) {
    state.icons[payload.username] = payload.icon
  },
  [GET_USERS](state, users) {
    state.users = users
  },
}
