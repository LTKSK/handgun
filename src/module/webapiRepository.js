const channels_url = 'http://localhost:5000/channels'

export async function fetchChannels(){
  const response = await fetch(channels_url)
  const json = await response.json()
  return json.map(channel => channel.name)
}

export async function postChannel(channel_name){
  const response = await fetch(channels_url,
                               {method: "POST",
                                body: JSON.stringify({name: channel_name})})
  return response.ok
}

export async function postReviewTarget(channel_name, file){
  const form = new FormData()
  form.append(file.name, file)
  const response = await fetch(`${channels_url}/${channel_name}/review-target`,
                               {method: "POST",
                                body: form})
  return response.ok
}

export async function fetchReviewTarget(channel_name){
  const response = await fetch(`${channels_url}/${channel_name}/review-target`)
  const blob = await response.blob()
  return blob
}

export async function fetchMessages(channel_name){
   const response = await fetch(`${channels_url}/${channel_name}/messages`)
   return response.json()
}

export async function postMessage(channel_name, message_data){
  const response = await fetch(`${channels_url}/${channel_name}/messages`,
                               {method: "POST",
                                body: JSON.stringify(message_data)})
  return response.ok
}

// export async function postLayer(channel_name, layer){
//   const response = await fetch(`${channels_url}/${channel_name}/review-target/layer`,
//                                {method: "POST",
//                                 body: JSON.stringify(layer)})
//   return response.ok
// }

export async function putLayer(channel_name, layer){
  const response = await fetch(`${channels_url}/${channel_name}/review-target/layer`,
                               {method: "PUT",
                                body: JSON.stringify(layer)})
  return response.ok
}

export async function fetchLayer(channel_name){
  const response = await fetch(`${channels_url}/${channel_name}/review-target/layer`)
  const json = await response.json()
  return json
}