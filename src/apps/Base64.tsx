import{useState}from'react'
export default function Base64(){
const[s,setS]=useState('');const[o,setO]=useState('')
const enc=()=>{const b=new TextEncoder().encode(s);setO(btoa(Array.from(b,x=>String.fromCharCode(x)).join('')))}
const dec=()=>{try{setO(new TextDecoder().decode(Uint8Array.from(atob(s.trim()),c=>c.charCodeAt(0))))}catch{setO('Invalid Base64 input')}}
return<div className="mx-auto max-w-xl space-y-3"><textarea className="inp h-32" placeholder="Input" value={s} onChange={e=>setS(e.target.value)}/>
<div className="flex gap-2"><button className="btn" onClick={enc}>Encode</button><button className="btn" onClick={dec}>Decode</button><button className="btn" onClick={()=>navigator.clipboard?.writeText(o)}>Copy result</button></div>
<pre className="card whitespace-pre-wrap break-all text-sm">{o||'Result appears here'}</pre></div>}
