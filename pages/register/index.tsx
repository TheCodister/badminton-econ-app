import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { handleRegister } from '@/lib/flaskauth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  const register = async () => {
    try{
      await handleRegister(username, email, phone, password, address);
      router.push('/login')
    }catch(e){
      router.push('/register')
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 items-center justify-center border-solid border-2 rounded-xl">
      <h1>Register</h1>
      <form className="flex flex-col gap-5 w-full xl:w-[30vw] lg:w-auto md:w-auto sm:w-auto" onSubmit={register}>
        <Input size="lg" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input size="lg" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input size="lg" placeholder="Phone" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Input size="lg" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input size="lg" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </form>
      <Button size="lg" color="primary" type="submit" onPress={register}>Register</Button>
      <p>Already have an account? <Link href="/login">Login</Link></p>
    </div>
  );
};

export default Register;