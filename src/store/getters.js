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
export const channels = state => state.channels
export const user = state => state.user
export const header = state => {
  return {"Authorization": `Bearer ${state.jwt}`}
}
