import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-5 p-5 items-center justify-center border-solid border-2 rounded-xl">
      <h1>Login</h1>
      <Input
        className="xl:w-[20vw] lg:w-auto md:w-auto sm:w-auto"
        size="lg"
        placeholder="Username"
      />
      <Input
        className="xl:w-[20vw] lg:w-auto md:w-auto sm:w-auto"
        size="lg"
        placeholder="Password"
        type="password"
      />
      <div className="flex gap-2">
        <Button size="lg" color="primary">
          Login
        </Button>
        <Button size="lg">Sign up</Button>
      </div>
      <a className="self-end" href="/">
        Forgot password?
      </a>
    </div>
  )
}
