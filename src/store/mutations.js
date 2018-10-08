import {
  LOGIN,
  GET_MESSAGES,
  ADD_MESSAGE,
  GET_CHANNELS,
  ADD_CHANNEL,
  GET_ICON,
  GET_USERS,
} from './mutation-types'


export default {
  [LOGIN](state, payload) {
    state.jwt = payload.jwt
    state.logged_in_user = payload.user
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
  [GET_ICON](state, payload) {
    // this code means emit to vue what 'state.icons' change
    state.icons = {
      ...state.icons,
    }
    state.icons[payload.username] = payload.icon
  },
  [GET_USERS](state, users) {
    state.users = users
  },
}
