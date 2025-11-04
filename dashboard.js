import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Dashboard(){
  const [msg,setMsg]=useState('loading...');
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('gweru_token');
    if(!token) router.push('/auth/login');
    axios.get((process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000') + '/api/v1/dashboard', { headers: { Authorization: 'Bearer '+token } })
      .then(r=> setMsg(JSON.stringify(r.data)))
      .catch(e=> { setMsg('error: '+(e.response?.data?.error || e.message)); });
  },[]);

  return (<div style={{padding:40}}><h1>Dashboard</h1><pre>{msg}</pre></div>);
}
