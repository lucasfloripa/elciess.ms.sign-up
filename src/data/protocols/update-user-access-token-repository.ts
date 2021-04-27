export interface UpdateUserAccessTokenRepository {
  updateAccessToken: (id: string, token: string) => Promise<void>
}
