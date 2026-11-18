import{useState}from'react'
const A=['SHA-1','SHA-256','SHA-384','SHA-512']
export default function Hash(){
const[s,setS]=useState('');const[h,setH]=useState<Record<string,string>>({})
const run=async(v:string)=>{setS(v);const d=new TextEncoder().encode(v);const o:Record<string,string>={};for(const a of A)o[a]=Array.from(new Uint8Array(await crypto.subtle.digest(a,d)),x=>x.toString(16).padStart(2,'0')).join('');setH(o)}
return<div className="mx-auto max-w-2xl space-y-3"><textarea className="inp h-28" placeholder="Type text to hash (processed locally)" value={s} onChange={e=>run(e.target.value)}/>
{A.map(a=><button key={a} className="card block w-full break-all text-left text-xs" onClick={()=>navigator.clipboard?.writeText(h[a]||'')}><b className="text-sm">{a}</b><br/>{h[a]||'—'}</button>)}<p className="text-xs opacity-60">Tap a hash to copy. Needs HTTPS or localhost.</p></div>}
