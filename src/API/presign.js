import config from '../../config'

export default async (platform) => {
  if (!localStorage.getItem('session_uuid')) {
    const res = await fetch(
      config.backendUrl + `api/v1/security/auth/token/presign?platform=${platform}`
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
}
