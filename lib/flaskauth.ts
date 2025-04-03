import { BACKEND_URL } from '@/constants/base_url'
import { signIn } from 'next-auth/react'

async function handleLogin(email: string, password: string) {
  try {
    console.log('email:', email, 'password:', password)

    // Send POST request to NestJS backend login route
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail: email, password: password }), // Match NestJS DTO (`mail` instead of `email`)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Invalid credentials')
    }

    const { access_token } = await response.json()
    console.log('JWT Token:', access_token)

    // Sign in with NextAuth, passing the JWT token
    const signInResponse = await signIn('credentials', {
      redirect: false,
      email,
      password,
      access_token, // Pass the JWT token received from NestJS
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
async function handleRegister(
  username: string,
  email: string,
  phone: string,
  password: string,
  address: string,
) {
  try {
    console.log('Registering user:', { username, email, phone, address })

    // Send POST request to NestJS backend register route
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        email: email,
        phone: phone,
        password: password,
        address: address,
      }), // Ensure 'mail' matches NestJS DTO
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Registration failed')
    }

    const data = await response.json()
    alert('Successfully registered!')

    return data // Return data for further use (e.g., auto-login, UI updates)
  } catch (error: any) {
    console.error('Registration error:', error.message)
    alert('Registration failed: ' + error.message)
    throw error
  }
}
export { handleLogin, handleRegister }
