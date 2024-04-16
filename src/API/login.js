import config from '../../config'

export default async (platform, email, password) => {
  const body = JSON.stringify({
    email: email,
    password: password,
    group_id: 1,
    platform: platform
  })
  const res = await fetch(config.backendUrl + `api/v1/security/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error(response.status)
    }
  })
  return res
}
