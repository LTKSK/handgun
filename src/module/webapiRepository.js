const channels_url = 'http://localhost:5000/channels'
const review_targets_url = 'http://localhost:5000/review-targets'

export async function fetchChannels(){
  const response = await fetch(channels_url)
  const json = await response.json()
  return json.map(channel => channel.name)
}

export async function postChannel(channel_name, file){
  const form = new FormData()
  form.append(file.name, file)
  const response = await fetch(`${channels_url}/${channel_name}`,
                               {method: "POST",
                                body: form})
  return response.ok
}

export async function fetchMessages(channel_name){
  const response = await fetch(`${channels_url}/${channel_name}/messages`)
  const json = await response.json()
  return json
}

export async function postMessage(channel_name, message_data){
  const response = await fetch(`${channels_url}/${channel_name}/messages`,
                               {method: "POST",
                                body: JSON.stringify(message_data)})
  return response.ok
}

export async function getReviewTarget(channel_name){
  const response = await fetch(`${review_targets_url}/${channel_name}`)
  const blob = await response.blob()
  return blob
}