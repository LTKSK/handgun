import {
  LOGIN,
  LOGOUT,
  GET_MESSAGES,
  EDIT_MESSAGE,
  ADD_MESSAGE,
  DELETE_MESSAGE,
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
  [LOGOUT](state) {
    state.jwt = ""
    state.logged_in_user = null
  },
  [GET_MESSAGES](state, messages) {
    state.messages = messages
  },
  [EDIT_MESSAGE](state, message) {
    for (let exists_message of state.messages) {
      if (exists_message.index !== message.index) {
        continue
      }
      exists_message.value = message.value
    }
  },
  [ADD_MESSAGE](state, message) {
    state.messages.push(message)
  },
  [DELETE_MESSAGE](state, message) {
    state.messages = state.messages
                     .filter(exists_message => exists_message.index !== message.index)
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
