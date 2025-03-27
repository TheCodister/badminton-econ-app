import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = Cookies.get('access_token')

    if (token) {
      // Make request to get the current logged-in user
      const username = localStorage.getItem('username') // Assuming you save username in localStorage during login

      fetch(`/users/${username}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to authenticate user')
          }
          return res.json()
        })
        .then((data) => {
          setUser(data) // Store user data
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  return { user, loading, error }
}
