// todo url from config or env.
const channels_url = 'http://localhost:5000/channels'
const users_url = 'http://localhost:5000/users'
const login_url = 'http://localhost:5000/login'

export async function registerUser(username, password){
  const user_data = {
    username,
    password
  }
  const response = await fetch(users_url,
                               {method: "POST",
                                body: JSON.stringify(user_data)})
  return response.ok
}

export async function registerUserIcon(username, file){
  const form = new FormData()
  form.append(file.name, file)
  const response = await fetch(`${users_url}/${username}/icon`,
                               {method: "POST",
                                body: form})
  return response.ok
}


export async function login(username, password){
  const user_data = {
    username,
    password
  }
  const response = await fetch(login_url,
                               {method: "POST",
                                body: JSON.stringify(user_data)})
  return response
}

export async function fetchChannels(headers){
  const response = await fetch(channels_url,
                               {method: "GET",
                                headers: headers})
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
  const response = await fetch(`${channels_url}/${channel_name}/review-targets`,
                               {method: "POST",
                                body: form})
  return response.ok
}

export async function fetchReviewTarget(channel_name){
  const response = await fetch(`${channels_url}/${channel_name}/review-targets`)
  const blob = await response.blob()
  return blob
}

export async function postMessage(channel_name, message_data){
  const response = await fetch(`${channels_url}/${channel_name}/messages`,
                               {method: "POST",
                                body: JSON.stringify(message_data)})
  return response.ok
}

export async function fetchMessages(channel_name){
   const response = await fetch(`${channels_url}/${channel_name}/messages`)
   return response.json()
}

export async function putLayer(channel_name, layer){
  const response = await fetch(`${channels_url}/${channel_name}/review-targets/layer`,
                               {method: "PUT",
                                body: JSON.stringify(layer)})
  return response.ok
}

export async function fetchLayer(channel_name){
  const response = await fetch(`${channels_url}/${channel_name}/review-targets/layer`)
  const json = await response.json()
  return json
}