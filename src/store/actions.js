import {
  SET_MESSAGE,
  GET_CHANNELS,
  ADD_CHANNEL,
} from './mutation-types'


const channels_path = 'http://localhost:5000/channels'


async function fetchChannels(){
  const response = await fetch(channels_path)
  const json = await response.json()
  return json.map(channel => channel.name)
}

async function postChannel(channel_name){
  const response = await fetch(channels_path+"/"+channel_name,
                               {method: "POST"})
  console.log(response)
  return response.ok
}

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
  [ADD_CHANNEL]({ commit }, channel) {
    // if post success, call commit.
    postChannel(channel).then(is_ok => {
      if(is_ok) {
        commit(ADD_CHANNEL, channel)
      }
    })
  }
}
