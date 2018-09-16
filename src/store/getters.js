// export const messages = state => state.messages.reverse()
export const messages = state => state.messages.sort((a, b) => {
  if(a.index > b.index) return -1
  if(a.index < b.index) return 1
  return 0
})
export const channels = state => state.channels
