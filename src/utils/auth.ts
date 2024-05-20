export type Auth = {
  status: 'loggedOut' | 'loggedIn'
  username?: string
  login: (username: string) => void
  logout: () => void
}

export const auth: Auth = {
  status: 'loggedOut',
  username: undefined,
  login: (username: string) => {
    auth.status = 'loggedIn'
    auth.username = username
  },
  logout: () => {
    auth.status = 'loggedOut'
    auth.username = undefined
  },
}
