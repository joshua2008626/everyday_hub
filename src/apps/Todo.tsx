import{useState}from'react'
import{useKV}from'../hooks/useKV'
type T={id:number;text:string;pri:0|1|2;due:string;done:boolean}
export default function Todo(){
const[ts,setTs]=useKV<T[]>('todos',[]);const[x,setX]=useState('');const[p,setP]=useState<0|1|2>(1);const[d,setD]=useState('')
const add=()=>{if(!x.trim())return;setTs([{id:Date.now(),text:x.trim(),pri:p,due:d,done:false},...ts]);setX('')}
const L=['Low','Medium','High']
const sorted=[...ts].sort((a,b)=>+a.done-+b.done||b.pri-a.pri)
return<div className="mx-auto max-w-lg space-y-3"><div className="flex flex-wrap gap-2"><input className="inp flex-1" placeholder="New task" value={x} onChange={e=>setX(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()}/>
<select className="inp w-28" value={p} onChange={e=>setP(+e.target.value as 0|1|2)}>{L.map((l,i)=><option key={l} value={i}>{l}</option>)}</select><input className="inp w-40" type="date" value={d} onChange={e=>setD(e.target.value)}/><button className="btn" onClick={add}>Add</button></div>
{!ts.length&&<p className="py-8 text-center opacity-60">Nothing to do. Add your first task.</p>}
{sorted.map(t=><div key={t.id} className="card flex items-center gap-3"><input type="checkbox" checked={t.done} onChange={()=>setTs(ts.map(o=>o.id===t.id?{...o,done:!o.done}:o))}/>
<div className={`flex-1 ${t.done?'line-through opacity-50':''}`}>{t.text}<div className="text-xs opacity-60">{L[t.pri]}{t.due&&` · due ${t.due}${!t.done&&t.due<new Date().toISOString().slice(0,10)?' (overdue)':''}`}</div></div>
<button onClick={()=>setTs(ts.filter(o=>o.id!==t.id))}>✕</button></div>)}</div>}
