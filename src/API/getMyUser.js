import config from '../../config'

export default async () => {
  const res = await fetch(config.backendUrl + `api/v1/security/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      if (response.status === 401) {
        throw new Error('Failed to authorization data')
      }
    }
  })
  console.log(res)
}
