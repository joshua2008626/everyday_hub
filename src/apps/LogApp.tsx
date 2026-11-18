import{useState,ReactNode}from'react'
import{useKV}from'../hooks/useKV'
export type F={k:string;label:string;type?:'text'|'number'|'time'|'select'|'area';opts?:string[]}
export type E={id:number;date:string;[k:string]:any}
const today=()=>new Date().toISOString().slice(0,10)
export default function LogApp({id,fields,summary,show,dated=true,extra}:{extra?:(e:E)=>ReactNode;id:string;fields:F[];summary?:(e:E[])=>string;show?:(e:E)=>string;dated?:boolean}){
const[es,setEs]=useKV<E[]>('log-'+id,[]);const[d,setD]=useState<Record<string,string>>({});const[date,setDate]=useState(today());const[q,setQ]=useState('')
const add=()=>{if(!fields.some(f=>d[f.k]))return;setEs([{id:Date.now(),date,...d},...es]);setD({})}
const shown=es.filter(e=>JSON.stringify(e).toLowerCase().includes(q.toLowerCase())).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id)
return<div className="mx-auto max-w-lg space-y-3">{summary&&<div className="card text-center">{summary(es)}</div>}
<div className="card space-y-2">{dated&&<input className="inp" type="date" value={date} onChange={e=>setDate(e.target.value)}/>}
{fields.map(f=>f.type==='area'?<textarea key={f.k} className="inp h-24" placeholder={f.label} value={d[f.k]||''} onChange={e=>setD({...d,[f.k]:e.target.value})}/>
:f.type==='select'?<select key={f.k} className="inp" value={d[f.k]||f.opts![0]} onChange={e=>setD({...d,[f.k]:e.target.value})}>{f.opts!.map(o=><option key={o}>{o}</option>)}</select>
:<label key={f.k} className="block text-sm">{f.label}<input className="inp" type={f.type||'text'} value={d[f.k]||''} onChange={e=>setD({...d,[f.k]:e.target.value})}/></label>)}
<button className="btn w-full" onClick={add}>Add entry</button></div>
{es.length>3&&<input className="inp" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)}/>}
{!es.length&&<p className="py-6 text-center opacity-60">No entries yet.</p>}
{shown.map(e=><div key={e.id} className="card flex justify-between gap-2 text-sm"><div><b>{e.date}</b><div className="whitespace-pre-wrap opacity-80">{show?show(e):fields.map(f=>e[f.k]).filter(Boolean).join(' · ')}</div>{extra?.(e)}</div><button className="opacity-50" onClick={()=>setEs(es.filter(o=>o.id!==e.id))}>✕</button></div>)}</div>}
