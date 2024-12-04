import { BASE_URL } from '@/constants/base_url'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('Attempting to login with credentials:', credentials)

          const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })

          if (!res.ok) {
            console.error('Response not ok:', res.status, res.statusText)
            throw new Error('Invalid credentials')
          }

          const user = await res.json()
          console.log('Backend user response:', user)

          // Return user object if response is valid
          if (user && user.username && user.mail) {
            return {
              id: user.user_id,
              email: user.mail,
              name: user.username,
              token: user.access_token, // Ensure this is correct
            }
          } else {
            console.error('Invalid response structure:', user)
            throw new Error('Invalid user data')
          }
        } catch (error) {
          console.error('Login failed:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token ?? '' // Add access token to JWT
        token.email = user.email
        token.name = user.name // Include user name
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken // Include JWT token in session
      session.user.email = token.email
      session.user.name = token.name ?? undefined // Include user name in session
      return session
    },
  },
}
