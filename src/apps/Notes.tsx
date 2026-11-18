import{useState}from'react'
import{db}from'../db'
import{useLiveQuery}from'dexie-react-hooks'
export default function Notes(){
const[q,setQ]=useState('');const[sel,setSel]=useState<number|null>(null)
const all=useLiveQuery(()=>db.notes.orderBy('updated').reverse().toArray(),[])||[]
const list=all.filter(n=>(n.title+n.body).toLowerCase().includes(q.toLowerCase())).sort((a,b)=>+b.pinned-+a.pinned)
const cur=all.find(n=>n.id===sel)
const add=async()=>setSel(await db.notes.add({title:'Untitled',body:'',pinned:false,updated:Date.now()}) as number)
return<div className="grid gap-4 md:grid-cols-[260px_1fr]">
<div><div className="mb-2 flex gap-2"><input className="inp" placeholder="Search notes" value={q} onChange={e=>setQ(e.target.value)}/><button className="btn" onClick={add}>New</button></div>
{!list.length&&<p className="py-8 text-center opacity-60">No notes yet. Tap New to start.</p>}
{list.map(n=><div key={n.id} className="card mb-2 cursor-pointer" onClick={()=>setSel(n.id!)}>{n.pinned&&'📌 '}{n.title}</div>)}</div>
{cur&&<div className="space-y-2"><input className="inp text-lg font-semibold" value={cur.title} onChange={e=>db.notes.update(cur.id!,{title:e.target.value,updated:Date.now()})}/>
<textarea className="inp h-72" value={cur.body} onChange={e=>db.notes.update(cur.id!,{body:e.target.value,updated:Date.now()})}/>
<div className="flex gap-2"><button className="btn" onClick={()=>db.notes.update(cur.id!,{pinned:!cur.pinned})}>{cur.pinned?'Unpin':'Pin'}</button><button className="btn" onClick={()=>{db.notes.delete(cur.id!);setSel(null)}}>Delete</button></div></div>}</div>}
