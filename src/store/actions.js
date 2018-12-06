import {
  LOGIN,
  LOGOUT,
  GET_MESSAGES,
  EDIT_MESSAGE,
  ADD_MESSAGE,
  DELETE_MESSAGE,
  GET_CHANNELS,
  ADD_CHANNEL,
  DELETE_CHANNEL,
  GET_ICON,
  GET_USERS,
  GET_LAYERS,
  UPDATE_LAYERS
} from './mutation-types'
import {
  login,
  fetchMessages,
  postMessage,
  putMessage,
  deleteMessage,
  fetchChannels,
  postChannel,
  deleteChannel,
  postReviewTarget,
  fetchUsers,
  fetchUserIcon,
  fetchLayers,
  putLayers
} from '@/module/webapiRepository'
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
      "layer_id": payload.layer_id
    }
    await postMessage(payload.channel_name, message_data)
    commit(ADD_MESSAGE, message_data)
  },
  async [EDIT_MESSAGE]({ commit }, message) {
    await putMessage(message)
    commit(EDIT_MESSAGE, message)
  },
  async [DELETE_MESSAGE]({ commit }, message) {
    await deleteMessage(message.channel, message.index)
    commit(DELETE_MESSAGE, message)
  },
  async [GET_CHANNELS]({ commit }, headers) {
    const channels = await fetchChannels(headers)
    commit(GET_CHANNELS, channels)
  },
  async [ADD_CHANNEL]({ commit }, payload) {
    await postChannel(payload.channel, payload.headers)
    await postReviewTarget(payload.channel, payload.file)
    commit(ADD_CHANNEL, payload.channel)
  },
  async [DELETE_CHANNEL]({ commit }, payload) {
    await deleteChannel(payload.channel, payload.headers)
    commit(DELETE_CHANNEL, payload.channel)
  },
  async [GET_ICON]({ commit }, username) {
    const icon = await fetchUserIcon(username)
    commit(GET_ICON, {username, icon})
  },
  async [GET_USERS]({ commit }) {
    const users = await fetchUsers()
    commit(GET_USERS, users)
  },
  async [GET_LAYERS]({ commit }, channel_name) {
    const layers = await fetchLayers(channel_name)
    commit(GET_LAYERS, layers)
  },
  async [UPDATE_LAYERS]({ commit }, payload) {
    await putLayers(payload.channel_name, payload.layers)
    commit(UPDATE_LAYERS, payload.layers)
  },
}
