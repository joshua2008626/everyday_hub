import{useState}from'react'
import{useKV}from'../hooks/useKV'
type R={id:number;t:string;days:string[]}
const today=()=>new Date().toISOString().slice(0,10)
export default function Routine(){
const[tab,setTab]=useState<'Morning'|'Evening'>('Morning');const[all,setAll]=useKV<Record<string,R[]>>('routines',{Morning:[],Evening:[]});const[x,setX]=useState('')
const l=all[tab]||[];const set=(n:R[])=>setAll({...all,[tab]:n});const dn=l.filter(r=>r.days.includes(today())).length
return<div className="mx-auto max-w-lg space-y-3"><div className="flex gap-2">{(['Morning','Evening'] as const).map(t=><button key={t} className={`card flex-1 ${tab===t?'ring-2 ring-accent':''}`} onClick={()=>setTab(t)}>{t}</button>)}</div>
<p className="text-center text-sm opacity-70">{dn}/{l.length} done today. Checks reset each day.</p>
<div className="flex gap-2"><input className="inp" placeholder="Add a step" value={x} onChange={e=>setX(e.target.value)}/><button className="btn" onClick={()=>{if(x.trim()){set([...l,{id:Date.now(),t:x.trim(),days:[]}]);setX('')}}}>Add</button></div>
{l.map(r=>{const d=r.days.includes(today());return<div key={r.id} className="card flex items-center gap-3"><input type="checkbox" checked={d} onChange={()=>set(l.map(o=>o.id===r.id?{...o,days:d?o.days.filter(v=>v!==today()):[...o.days,today()]}:o))}/><span className={`flex-1 ${d?'line-through opacity-50':''}`}>{r.t}</span><button onClick={()=>set(l.filter(o=>o.id!==r.id))}>✕</button></div>})}</div>}
