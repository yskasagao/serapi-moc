import { HttpError } from '@/lib/error'

type Result = {
  token_type: string
  access_token: string
  expires_in: number
}
export const fetchOauthToken = async (clientId: string, clientSecret: string): Promise<Result> => {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  })
  return fetch(`https://api.line.me/oauth2/v3/token`, {
    method: 'POST',
    cache: 'no-store',
    body,
  }).then((res) => {
    if (!res.ok) {
      throw new HttpError(res)
    }
    return res.json() as Promise<Result>
  })
}
