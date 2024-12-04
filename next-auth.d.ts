import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
    }
    accessToken: string // Add custom property
  }

  interface User {
    id: string
    email: string
    name?: string
    token?: string // Add custom property
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string // Add custom property
    email: string // Add custom property
  }
}
