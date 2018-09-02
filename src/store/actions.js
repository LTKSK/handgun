import {
  SET_MESSAGE,
  GET_CHANNELS,
  ADD_CHANNEL,
} from './mutation-types'
import {
  fetchChannels,
  postChannel,
} from '../module/webappRepository'


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
