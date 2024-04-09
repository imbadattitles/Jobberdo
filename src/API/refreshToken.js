import config from '../../config'

export default async () => {
  const session = localStorage.getItem('session_uuid')
  const refresh = localStorage.getItem('refresh_token')
  const res = await fetch(
    config.backendUrl +
      `api/v1/security/auth/token/refresh?session_uuid=${session}&refresh_token=${refresh}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Failed to fetch data')
    }
  })
  if (res) {
    localStorage.setItem('session_uuid', res.data.session_uuid)
    localStorage.setItem('refresh_token', res.data.refresh_token)
  }
}
