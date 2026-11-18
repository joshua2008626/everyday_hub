import{useState}from'react'
import{useKV}from'../hooks/useKV'
type G={id:number;title:string;ms:{t:string;done:boolean}[]}
export default function Goals(){
const[gs,setGs]=useKV<G[]>('goals',[]);const[x,setX]=useState('');const[m,setM]=useState<Record<number,string>>({})
const upd=(g:G)=>setGs(gs.map(o=>o.id===g.id?g:o))
return<div className="mx-auto max-w-lg space-y-3"><div className="flex gap-2"><input className="inp" placeholder="New goal" value={x} onChange={e=>setX(e.target.value)}/><button className="btn" onClick={()=>{if(x.trim()){setGs([...gs,{id:Date.now(),title:x.trim(),ms:[]}]);setX('')}}}>Add</button></div>
{!gs.length&&<p className="py-8 text-center opacity-60">Set a goal and break it into milestones.</p>}
{gs.map(g=>{const p=g.ms.length?Math.round(g.ms.filter(s=>s.done).length/g.ms.length*100):0;return<div key={g.id} className="card space-y-2"><div className="flex justify-between"><b>{g.title}</b><span>{p}%</span></div><div className="h-2 overflow-hidden rounded bg-slate-500/20"><div className="h-full bg-accent" style={{width:p+'%'}}/></div>
{g.ms.map((s,i)=><label key={i} className="flex gap-2 text-sm"><input type="checkbox" checked={s.done} onChange={()=>upd({...g,ms:g.ms.map((o,j)=>j===i?{...o,done:!o.done}:o)})}/>{s.t}</label>)}
<div className="flex gap-2"><input className="inp" placeholder="Add milestone" value={m[g.id]||''} onChange={e=>setM({...m,[g.id]:e.target.value})}/><button className="btn" onClick={()=>{if(m[g.id]?.trim()){upd({...g,ms:[...g.ms,{t:m[g.id].trim(),done:false}]});setM({...m,[g.id]:''})}}}>+</button></div>
<button className="text-xs opacity-50" onClick={()=>setGs(gs.filter(o=>o.id!==g.id))}>Delete goal</button></div>})}</div>}
