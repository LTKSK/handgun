import {
  LOGIN,
  GET_MESSAGES,
  ADD_MESSAGE,
  GET_CHANNELS,
  ADD_CHANNEL,
} from './mutation-types'
import {
  login,
  fetchMessages,
  postMessage,
  fetchChannels,
  postChannel,
  postReviewTarget,
} from '../module/webapiRepository'


export default {
  async [LOGIN]({ commit }, payload) {
    const response = await login(payload.username, payload.password)
    if (! response.ok) {
      return false
    }
    const json = await response.json()
    commit(LOGIN, {jwt: json.token, user: payload.username})
    return true
  },
  [GET_MESSAGES]({ commit }, channel_name) {
    fetchMessages(channel_name).then(messages => {
      commit(GET_MESSAGES, messages)
    })
  },
  [ADD_MESSAGE]({ commit }, payload) {
    const message_data = {
      "index": payload.index,
      "value": payload.message,
      // todo: set date data.
      "date": "2018-08-01T12:00:00.110Z",
      "user": payload.user,
    }
    postMessage(payload.channel_name, message_data)
      .then(is_ok => {
        if(is_ok){
          commit(ADD_MESSAGE, message_data)
        }
      })
  },
  [GET_CHANNELS]({ commit }, headers) {
    fetchChannels(headers).then(channels => {
      commit(GET_CHANNELS, channels)
    })
  },
  async [ADD_CHANNEL]({ commit }, payload) {
    // if post success, call commit.
    let post_succeed = await postChannel(payload.channel)
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
}
