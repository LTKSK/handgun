import * as types from './mutation-types'
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
  putLayers,
  deleteLayer
} from '@/module/webapiRepository'
import moment from 'moment'

export default {
  async [types.LOGIN]({ commit }, payload) {
    const response = await login(payload.username, payload.password)
    const json = await response.json()
    commit(types.LOGIN, {jwt: json.token, user: payload.username})
  },
  async [types.LOGOUT]({ commit }) {
    commit(types.LOGOUT)
  },
  async [types.GET_MESSAGES]({ commit }, channel_name) {
    const messages = await fetchMessages(channel_name)
    commit(types.GET_MESSAGES, messages)
  },
  async [types.ADD_MESSAGE]({ commit }, payload) {
    const message_data = {
      "index": payload.index,
      "value": payload.message,
      "date": moment().utc().toISOString(),
      "user": payload.user,
      "layer_id": payload.layer_id
    }
    await postMessage(payload.channel_name, message_data)
    commit(types.ADD_MESSAGE, message_data)
  },
  async [types.EDIT_MESSAGE]({ commit }, message) {
    await putMessage(message)
    commit(types.EDIT_MESSAGE, message)
  },
  async [types.DELETE_MESSAGE]({ commit }, message) {
    await deleteMessage(message.channel, message.index)
    commit(types.DELETE_MESSAGE, message)
  },
  async [types.GET_CHANNELS]({ commit, state }) {
    const header = {"Authorization": `Bearer ${state.jwt}`}
    const channels = await fetchChannels(header)
    commit(types.GET_CHANNELS, channels)
  },
  async [types.ADD_CHANNEL]({ commit, state }, payload) {
    const header = {"Authorization": `Bearer ${state.jwt}`}
    await postChannel(payload.channel, header)
    await postReviewTarget(payload.channel, payload.file, header)
    commit(types.ADD_CHANNEL, payload.channel)
  },
  async [types.DELETE_CHANNEL]({ commit, state }, channel) {
    const header = {"Authorization": `Bearer ${state.jwt}`}
    await deleteChannel(channel, header)
    commit(types.DELETE_CHANNEL, channel)
  },
  async [types.GET_ICON]({ commit }, username) {
    const icon = await fetchUserIcon(username)
    commit(types.GET_ICON, {username, icon})
  },
  async [types.GET_USERS]({ commit }) {
    const users = await fetchUsers()
    commit(types.GET_USERS, users)
  },
  async [types.GET_LAYERS]({ commit, state }, channel_name) {
    const header = {"Authorization": `Bearer ${state.jwt}`}
    const layers = await fetchLayers(channel_name, header)
    commit(types.GET_LAYERS, layers)
  },
  async [types.UPDATE_LAYERS]({ commit }, payload) {
    await putLayers(payload.channel_name, payload.layers)
    commit(types.UPDATE_LAYERS, payload.layers)
  },
  async [types.DELETE_LAYER]({ commit }, payload) {
    await deleteLayer(payload.channel_name, payload.layer)
    commit(types.DELETE_LAYER, payload.layer)
    const messages = await fetchMessages(payload.channel_name)
    commit(types.GET_MESSAGES, messages)
  }
}
