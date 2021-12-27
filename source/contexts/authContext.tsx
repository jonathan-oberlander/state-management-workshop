import React from 'react'

export type AuthResponse = {
  title: string | null
  forename: string
  surname: string
  userId: number
}

export type AuthStatus = 'idle' | 'loading' | 'authorised' | 'error'

export interface AuthState {
  status: AuthStatus
  data: AuthResponse
  dice?: number
  error?: unknown
}

// Context with Class and life Cycle ------------------------------------------------
export const AuthContext = React.createContext({} as AuthState)
export const AuthConsumer = AuthContext.Consumer
export class AuthProvider extends React.Component<unknown, AuthState> {
  override state: AuthState = {
    status: 'idle',
    data: {} as AuthResponse
  }

  override async componentDidMount() {
    this.rollDiceInterval(800)
    try {
      this.setState({ ...this.state, status: 'loading' })
      const data = await this.auth()
      this.setState({ status: 'authorised', data })
    } catch (error) {
      this.setState({ ...this.state, status: 'error', error })
      this.signout()
    }
  }

  rollDiceInterval(t: number) {
    setInterval(() => {
      this.setState({
        ...this.state,
        dice: Math.ceil(Math.random() * 6)
      })
    }, t)
  }

  async auth(): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() < 1
          ? reject('Authentication failed.')
          : resolve({
              title: 'Mr',
              forename: 'Josh',
              surname: 'Mane',
              userId: 6730
            })
      }, 1200)
    })
  }

  async signout(): Promise<void> {}

  override render() {
    const { children } = this.props
    return (
      <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>
    )
  }
}
