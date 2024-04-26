import config from '../../config'

export default async (email) => {
  const body = JSON.stringify({
    email: email
  })
  const res = await fetch(config.backendUrl + `api/v1/security/auth/verification/email/start`, {
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
