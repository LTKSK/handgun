import {
  GET_MESSAGES,
  ADD_MESSAGE,
  GET_CHANNELS,
  ADD_CHANNEL,
} from './mutation-types'
import {
  fetchMessages,
  postMessage,
  fetchChannels,
  postChannel,
} from '../module/webapiRepository'


export default {
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
      // todo: set user data from authorization.
      "user": "Anonymouse",
    }
    postMessage(payload.channel_name, message_data)
      .then(is_ok => {
        if(is_ok){
          commit(ADD_MESSAGE, message_data)
        }
      })
  },
  [GET_CHANNELS]({ commit }) {
    fetchChannels().then(channels => {
      commit(GET_CHANNELS, channels)
    })
  },
  [ADD_CHANNEL]({ commit }, payload) {
    if(payload.channel === ""){
      return
    }
    if(payload.file == undefined){
      return
    }
    // if post success, call commit.
    postChannel(payload.channel, payload.file).then(is_ok => {
      if(is_ok) {
        commit(ADD_CHANNEL, payload.channel)
      }
    })
  }
}
