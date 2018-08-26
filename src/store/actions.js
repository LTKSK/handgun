import { SET_MESSAGE, GET_CHANNELS } from './mutation-types'


const chat_path = 'http://localhost:5000/chats'


async function fetch_chats(){
  const response = await fetch(chat_path)
  const json = await response.json()
  return json.map(chat => chat.name)
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
    fetch_chats().then(chats => {
      commit(GET_CHANNELS, chats)
    })
  }
}
