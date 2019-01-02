import moment from 'moment'

export const messages = state => {
  state.messages.sort((a, b) => {
    if(a.index > b.index) return -1
    if(a.index < b.index) return 1
    return 0
  })
  state.messages.forEach(message => {
    if(moment(message.date, moment.ISO_8601).isValid()) {
      message.date = moment(message.date, moment.ISO_8601).format("hh:mm:ss")
    }
  })
  return state.messages
}
export const channels = state => state.channels.map(channel => channel.name)
export const channel_users = state => channel => {
  const channels = state.channels.filter(exists_channel => exists_channel.name === channel)
  if (channels.length === 0) {
    return []
  }
  return channels[0].users
}
export const logged_in_user = state => state.logged_in_user
export const users = state => state.users
export const header = state => {
  return {"Authorization": `Bearer ${state.jwt}`}
}
export const icon = state => (username) => state.icons[username]
export const layers = state => state.layers
export const current_layer = state => state.current_layer
