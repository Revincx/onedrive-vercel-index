import { kv } from '@vercel/kv';
import siteConfig from '../../config/site.config'

export async function getOdAuthTokens(): Promise<{ accessToken: unknown; refreshToken: unknown }> {
  const accessToken = await kv.get<string>(`${siteConfig.kvPrefix}access_token`)
  const refreshToken = await kv.get<string>(`${siteConfig.kvPrefix}refresh_token`)

  return {
    accessToken,
    refreshToken,
  }
}

export async function storeOdAuthTokens({
  accessToken,
  accessTokenExpiry,
  refreshToken,
}: {
  accessToken: string
  accessTokenExpiry: number
  refreshToken: string
}): Promise<void> {
  await kv.set(`${siteConfig.kvPrefix}access_token`, accessToken, { ex: accessTokenExpiry })
  await kv.set(`${siteConfig.kvPrefix}refresh_token`, refreshToken)
}
