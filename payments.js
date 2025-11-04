import axios from 'axios';
import { useState } from 'react';

export default function Payments(){
  const [url,setUrl]=useState('');
  async function create(){
    const token = localStorage.getItem('gweru_token');
    const res = await axios.post((process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000') + '/api/v1/payments/paynow/create', { amount_cents: 1000, currency: 'USD' }, { headers: { Authorization: 'Bearer '+token } });
    setUrl(res.data.checkout_url);
  }
  return (<div style={{padding:40}}><h2>Payments (Sandbox)</h2><button onClick={create}>Create Paynow Checkout</button>{url && <p>Checkout URL: <a href={url} target="_blank" rel="noreferrer">{url}</a></p>}</div>);
}
