import config from '../../config'

export default async (key, code) => {
  const body = JSON.stringify({
    key: key,
    code: code
  })
  const res = await fetch(config.backendUrl + `api/v1/security/auth/verification/email/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  }).then(async (response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      const json = await response.json()
      throw new Error(json.error.user_message)
    }
  })
  return res
}
