export const BASE_URL = 'http://localhost:3000'
export const BACKEND_URL =
  process.env.ENV === 'Development'
    ? 'https://badminton-econ-app.onrender.com'
    : 'http://localhost:3001'
