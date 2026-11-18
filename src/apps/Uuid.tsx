import{useState}from'react'
export default function Uuid(){
const[n,setN]=useState(5);const[l,setL]=useState<string[]>([])
const dl=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([l.join('\n')],{type:'text/plain'}));a.download='uuids.txt';a.click()}
return<div className="mx-auto max-w-md space-y-3"><div className="flex gap-2"><input className="inp" type="number" min={1} max={500} value={n} onChange={e=>setN(+e.target.value)}/><button className="btn" onClick={()=>setL(Array.from({length:Math.min(500,Math.max(1,n))},()=>crypto.randomUUID()))}>Generate</button></div>
{l.length>0&&<><pre className="card max-h-72 overflow-auto text-xs">{l.join('\n')}</pre><div className="flex gap-2"><button className="btn" onClick={()=>navigator.clipboard?.writeText(l.join('\n'))}>Copy</button><button className="btn" onClick={dl}>Download</button></div></>}</div>}
