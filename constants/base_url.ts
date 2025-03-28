export const BASE_URL = 'http://localhost:3000'
export const BACKEND_URL =
  process.env.ENV === 'Development'
    ? 'http://localhost:3001'
    : 'https://badminton-econ-app.onrender.com'
