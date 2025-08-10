'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  // All hooks go first
  const [session, setSession] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else if (session.user.user_metadata.role !== 'admin') {
        router.push('/');
      } else {
        setSession(session);
      }
    });
  }, [router]);

  if (!session) return <p>Loading...</p>;

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Upload New Photo</h1>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button className="bg-pink-500 text-white px-4 py-2">Upload</button>
      </form>
    </div>
  );
}
