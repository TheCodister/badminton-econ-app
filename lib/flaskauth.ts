import { BASE_URL } from '@/constants/base_url'
import { signIn } from 'next-auth/react'

async function handleLogin(email: string, password: string) {
  try {
    console.log('email:', email, 'password:', password)

    // Send POST request to Flask backend with the correct property name
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }), // Changed `mail` to `email`
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Invalid credentials')
    }

    const user = await response.json()
    console.log('Backend user response:', user)

    // Sign in with NextAuth
    const signInResponse = await signIn('credentials', {
      redirect: false,
      email: email, // Pass email from input
      password, // Pass password from input
    })

    if (!signInResponse || !signInResponse.ok) {
      throw new Error(signInResponse?.error || 'Login failed')
    }

    alert('Login successful!')
  } catch (error: any) {
    console.error('Login failed:', error.message)
    alert('Login failed: ' + error.message)
  }
}

export { handleLogin }
