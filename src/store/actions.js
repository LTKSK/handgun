import {
  LOGIN,
  LOGOUT,
  GET_MESSAGES,
  ADD_MESSAGE,
  GET_CHANNELS,
  ADD_CHANNEL,
  GET_ICON,
  GET_USERS,
} from './mutation-types'
import {
  login,
  fetchMessages,
  postMessage,
  fetchChannels,
  postChannel,
  postReviewTarget,
  fetchUsers,
  fetchUserIcon,
} from '../module/webapiRepository'
import moment from 'moment'

export default {
  async [LOGIN]({ commit }, payload) {
    const response = await login(payload.username, payload.password)
    const json = await response.json()
    commit(LOGIN, {jwt: json.token, user: payload.username})
  },
  async [LOGOUT]({ commit }) {
    commit(LOGOUT)
  },
  async [GET_MESSAGES]({ commit }, channel_name) {
    const messages = await fetchMessages(channel_name)
    commit(GET_MESSAGES, messages)
  },
  async [ADD_MESSAGE]({ commit }, payload) {
    const message_data = {
      "index": payload.index,
      "value": payload.message,
      "date": moment().utc().toISOString(),
      "user": payload.user,
    }
    postMessage(payload.channel_name, message_data)
      .then(is_ok => {
        if(is_ok){
          commit(ADD_MESSAGE, message_data)
        }
      })
  },
  async [GET_CHANNELS]({ commit }, headers) {
    const channels = await fetchChannels(headers)
    commit(GET_CHANNELS, channels)
  },
  async [ADD_CHANNEL]({ commit }, payload) {
    // if post success, call commit.
    let post_succeed = await postChannel(payload.channel, payload.headers)
    if(! post_succeed) {
      return false
    }
    post_succeed = await postReviewTarget(payload.channel, payload.file)
    if(! post_succeed){
      return false
    }
    commit(ADD_CHANNEL, payload.channel)
    return true
  },
  async [GET_ICON]({ commit }, username) {
    const icon = await fetchUserIcon(username)
    commit(GET_ICON, {username, icon})
  },
  async [GET_USERS]({ commit }) {
    const users = await fetchUsers()
    commit(GET_USERS, users)
  },
}
