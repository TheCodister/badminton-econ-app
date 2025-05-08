export const BACKEND_URL =
  process.env.NEXT_PUBLIC_ENV == 'dev'
    ? 'https://badminton-econ-app.onrender.com'
    : 'http://localhost:3001'
