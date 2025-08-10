'use client';
import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      return;
    }
    router.push('/admin');
  };

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm">
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-pink-500 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
}
