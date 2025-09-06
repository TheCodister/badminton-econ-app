export const BACKEND_URL =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? 'https://badminton-econ-app-q9zz.vercel.app'
    : 'http://localhost:3001'
