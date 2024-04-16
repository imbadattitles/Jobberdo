import config from '../../config'

export default async (key, password, first_name, last_name, middle_name) => {
  const body = JSON.stringify({
    key,
    password,
    first_name,
    last_name,
    middle_name
  })
  console.log(body)
  const res = await fetch(config.backendUrl + `api/v1/security/auth/verification/email/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      console.log(response.json())
      throw new Error(response.status)
    }
  })
  return res
}
