import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();

  async function submit(e){
    e.preventDefault();
    try{
      const res = await axios.post((process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000') + '/api/v1/auth/login', { email, password });
      localStorage.setItem('gweru_token', res.data.token);
      localStorage.setItem('gweru_user', JSON.stringify(res.data.user));
      router.push('/dashboard');
    }catch(err){
      alert('Login failed: '+(err.response?.data?.error || err.message));
    }
  }

  return (<div style={{padding:40}}><h2>Login</h2><form onSubmit={submit}><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block',marginBottom:10}} /><input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:'block',marginBottom:10}} /><button>Login</button></form></div>);
}
