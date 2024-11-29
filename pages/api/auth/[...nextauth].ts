import { authConfig } from '@/lib/auth'
import NextAuth from 'next-auth'

export default NextAuth(authConfig)
