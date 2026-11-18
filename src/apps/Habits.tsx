import{useState}from'react'
import{useKV}from'../hooks/useKV'
type H={id:number;name:string;days:string[]}
const key=(d:Date)=>d.toISOString().slice(0,10)
const streak=(days:string[])=>{let n=0;const d=new Date();if(!days.includes(key(d)))d.setDate(d.getDate()-1);while(days.includes(key(d))){n++;d.setDate(d.getDate()-1)}return n}
export default function Habits(){
const[hs,setHs]=useKV<H[]>('habits',[]);const[x,setX]=useState('');const today=key(new Date())
const last7=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return key(d)})
const tog=(h:H,d:string)=>setHs(hs.map(o=>o.id===h.id?{...o,days:o.days.includes(d)?o.days.filter(v=>v!==d):[...o.days,d]}:o))
return<div className="mx-auto max-w-lg space-y-3"><div className="flex gap-2"><input className="inp" placeholder="New habit" value={x} onChange={e=>setX(e.target.value)}/><button className="btn" onClick={()=>{if(x.trim()){setHs([...hs,{id:Date.now(),name:x.trim(),days:[]}]);setX('')}}}>Add</button></div>
{!hs.length&&<p className="py-8 text-center opacity-60">Track a habit to start a streak.</p>}
{hs.map(h=><div key={h.id} className="card"><div className="flex justify-between"><b>{h.name}</b><span>🔥 {streak(h.days)}</span></div>
<div className="mt-2 flex gap-1">{last7.map(d=><button key={d} title={d} className={`h-8 flex-1 rounded-lg ${h.days.includes(d)?'bg-accent':'bg-slate-500/20'} ${d===today?'ring-2 ring-accent/60':''}`} onClick={()=>tog(h,d)}/>)}</div>
<button className="mt-2 text-xs opacity-60" onClick={()=>setHs(hs.filter(o=>o.id!==h.id))}>Delete</button></div>)}</div>}
