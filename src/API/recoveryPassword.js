import config from '../../config'

export default async (email_verification_key, email, new_password) => {
  const body = JSON.stringify({
    email_verification_key,
    email,
    new_password
  })
  const res = await fetch(config.backendUrl + `api/v1/security/auth/password-recovery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
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
