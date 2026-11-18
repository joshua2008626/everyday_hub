import{useState}from'react'
export default function Random(){
const[a,setA]=useState(1);const[b,setB]=useState(100);const[n,setN]=useState(1);const[r,setR]=useState<number[]>([])
const gen=()=>{const lo=Math.min(a,b),hi=Math.max(a,b),x=new Uint32Array(Math.min(n,500));crypto.getRandomValues(x);setR(Array.from(x,v=>lo+v%(hi-lo+1)))}
return<div className="mx-auto max-w-sm space-y-3"><div className="flex gap-2">{[['Min',a,setA],['Max',b,setB],['Count',n,setN]].map(([l,v,s]:any)=><label key={l} className="flex-1 text-sm">{l}<input className="inp" type="number" value={v} onChange={e=>s(+e.target.value)}/></label>)}</div>
<button className="btn w-full" onClick={gen}>Generate</button><div className="card break-words text-center text-2xl">{r.join(', ')||'—'}</div></div>}
