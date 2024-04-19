import config from '../../config'

export default async (key, password, first_name, last_name) => {
  const body = JSON.stringify({
    email_verification_key: key,
    password,
    first_name,
    last_name,
    middle_name: 'sdsddsff'
  })
  console.log(body)
  const res = await fetch(config.backendUrl + `api/v1/security/auth/register`, {
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
