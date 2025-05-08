export const BACKEND_URL =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? 'https://badminton-econ-app.onrender.com'
    : 'http://localhost:3001'
