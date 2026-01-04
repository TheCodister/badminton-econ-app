export const BACKEND_URL =
  process.env.NEXT_PUBLIC_ENV === 'prod' || process.env.NEXT_PUBLIC_ENV === 'qa'
    ? 'https://badminton-econ-app-express-backend.vercel.app'
    : 'http://localhost:3001'
