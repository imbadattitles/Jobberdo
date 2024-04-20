import config from '../../config'

export default async (code, error) => {
  const res = await fetch(
    config.backendUrl +
      `api/v1/security/auth/login/google/complete?platform=web&error=${error}&code=${code}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }
  ).then(async (response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      const json = await response.json()
      console.log(json)
      throw new Error(json.error.user_message)
    }
  })
  return res
}
