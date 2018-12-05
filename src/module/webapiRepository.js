import { Layer } from "@/module/layer"
// todo url from config or environ.
const channels_url = 'http://localhost:5000/channels'
const users_url = 'http://localhost:5000/users'
const login_url = 'http://localhost:5000/login'
const layers_url = 'http://localhost:5000/layers'

async function fetchWithErrorHandring(url, options) {
  const response = await fetch(url, options).catch(() => {
    throw new Error("Can't connect to server")
  })
  if (response.ok) {
    return response
  }
  if (response.status == 400) throw new Error("BAD_REQUEST")
  if (response.status == 401) throw new Error("UNAUTHORIZED")
  if (response.status == 403) throw new Error("FORBIDDEN")
  if (response.status == 404) throw new Error("NOT_FOUND")
  if (response.status == 409) throw new Error("CONFLICT")
  if (response.status == 500) throw new Error("INTERNAL_SERVER_ERROR")
  throw new Error("something erorr occurred.")
}

export async function postUser(username, password){
  const user_data = {
    username,
    password
  }
  const response = await fetch(users_url,
                               {method: "POST",
                                body: JSON.stringify(user_data)})
  return response.ok
}

export async function fetchUsers(){
  const response = await fetch(users_url)
  const json = await response.json()
  return json
}

export async function postUserIcon(username, icon_data){
  const form = new FormData()
  form.append(`${username}_icon`, icon_data)
  const response = await fetchWithErrorHandring(`${users_url}/icons/${username}`,
                                                {method: "POST",
                                                  body: form})
  return response.ok
}

export async function fetchUserIcon(username){
  const response = await fetchWithErrorHandring(`${users_url}/icons/${username}`)
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}

export async function login(username, password){
  const user_data = {
    username,
    password
  }
  const response = await fetchWithErrorHandring(login_url,
                                                {method: "POST",
                                                 body: JSON.stringify(user_data)})
  return response
}

export async function fetchChannels(headers){
  const response = await fetchWithErrorHandring(channels_url,
                                                {method: "GET",
                                                 headers: headers})
  const json = await response.json()
  return json.map(channel => channel.name)
}

export async function postChannel(channel_name, headers){
  const response = await fetchWithErrorHandring(channels_url,
                                                {method: "POST",
                                                 headers: headers,
                                                 body: JSON.stringify({name: channel_name})})
  return response.ok
}

export async function deleteChannel(channel_name, headers){
  const response = await fetchWithErrorHandring(`${channels_url}/${channel_name}`,
                                                {method: "DELETE",
                                                 headers: headers})
  return response.ok
}

export async function putChannelUsers(channel_name, user_names, headers){
  const response = await fetchWithErrorHandring(`${channels_url}/${channel_name}/users`,
                                                {method: "PUT",
                                                 headers: headers,
                                                 body: JSON.stringify({user_name: user_names})})
  return response.ok
}

export async function postReviewTarget(channel_name, file){
  const form = new FormData()
  form.append(file.name, file)
  const response = await fetchWithErrorHandring(`${channels_url}/${channel_name}/review-targets`,
                                                {method: "POST",
                                                 body: form})
  return response.ok
}

export async function fetchReviewTarget(channel_name){
  const response = await fetchWithErrorHandring(`${channels_url}/${channel_name}/review-targets`)
  const blob = await response.blob()
  return blob
}

export async function postMessage(channel_name, message_data){
  const response = await fetchWithErrorHandring(`${channels_url}/${channel_name}/messages`,
                                                {method: "POST",
                                                 body: JSON.stringify(message_data)})
  return response.ok
}

export async function fetchMessages(channel_name){
   const response = await fetchWithErrorHandring(`${channels_url}/${channel_name}/messages`)
   return response.json()
}

export async function putMessage(message_data){
   const response = await fetchWithErrorHandring(`${channels_url}/${message_data.channel}/messages`,
                                                 {method: "PUT",
                                                  body: JSON.stringify(message_data)})
   return response.ok
}

export async function deleteMessage(channel_name, index){
  const response = await fetchWithErrorHandring(`${channels_url}/${channel_name}/messages/${index}`,
                                                {method: "DELETE"})
  return response.ok
}

export async function fetchLayers(channel_name){
  const response = await fetchWithErrorHandring(`${layers_url}/${channel_name}`)
  const json = await response.json()
  // if channel has not layers yet, make a layer.
  if (json.layers === undefined) {
    return [new Layer([1.0, 1.0, 1.0, 1.0], 0, [], [], [], 0)]
  }
  const layers = []
  for(let layer_data of json.layers){
    layers.push(new Layer(layer_data.color,
                          layer_data.polygon_count,
                          layer_data.vertices,
                          layer_data.start_indices,
                          layer_data.vertex_counts))
  }
  return layers
}

export async function putLayers(channel_name, layers){
  const response = await fetchWithErrorHandring(`${layers_url}/${channel_name}`,
                                                {method: "PUT",
                                                 body: JSON.stringify(layers)})
  return response.ok
}
