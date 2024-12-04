import { useAuth } from '@/context/context'
import GoogleIcon from '@/icons/GoogleIcon'
import { handleLogin } from '@/lib/flaskauth'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Link } from '@nextui-org/link'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LoginPage() {
  const { isLoggedIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // const handleLogin = () => {
  //   signIn('credentials', {
  //     redirect: false,
  //     email,
  //     password,
  //   })
  // }

  const login = async () => {
    await handleLogin(email, password)
  }

  if (isLoggedIn) {
    router.push('/')
  }

  return (
    <div className="flex flex-col gap-5 p-5 items-center justify-center border-solid border-2 rounded-xl">
      <h1>{isLoggedIn ? 'Welcome Back!' : 'Login'}</h1>
      {!isLoggedIn ? (
        <>
          {/* Normal login form */}
          <Input
            className="xl:w-[30vw] lg:w-auto md:w-auto sm:w-auto"
            size="lg"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="xl:w-[30vw] lg:w-auto md:w-auto sm:w-auto"
            size="lg"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <Button size="lg" color="primary" onPress={login}>
              Login
            </Button>
            <Button size="lg">Sign up</Button>
          </div>
          <p>Or login with:</p>
          {/* OAuth login buttons */}
          <div className="flex gap-2">
            <Button
              startContent={<GoogleIcon width={16} />}
              variant="bordered"
              size="lg"
              onPress={() => signIn('google')}
            >
              Google
            </Button>
            <Button
              startContent={<GitHubLogoIcon />}
              variant="bordered"
              size="lg"
              onPress={() => signIn('github')}
            >
              GitHub
            </Button>
          </div>
          <Link className="self-end" href="/">
            Forgot password?
          </Link>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <p>You are logged in!</p>
          <Button size="lg" color="danger" onPress={() => signOut()}>
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
