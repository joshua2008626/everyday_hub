import{useState}from'react'
import{useKV}from'../hooks/useKV'
type I={id:number;t:string;q:string;c:string;done:boolean}
const C=['Produce','Dairy','Pantry','Meat','Household','Other']
export default function Shopping(){
const[l,setL]=useKV<I[]>('shopping',[]);const[t,setT]=useState('');const[q,setQ]=useState('1');const[c,setC]=useState('Produce')
const add=()=>{if(t.trim()){setL([...l,{id:Date.now(),t:t.trim(),q,c,done:false}]);setT('')}}
return<div className="mx-auto max-w-lg space-y-3"><div className="flex gap-2"><input className="inp flex-1" placeholder="Item" value={t} onChange={e=>setT(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()}/><input className="inp w-16" value={q} onChange={e=>setQ(e.target.value)}/><select className="inp w-28" value={c} onChange={e=>setC(e.target.value)}>{C.map(x=><option key={x}>{x}</option>)}</select><button className="btn" onClick={add}>Add</button></div>
{!l.length&&<p className="py-8 text-center opacity-60">Your list is empty.</p>}
{C.filter(x=>l.some(i=>i.c===x)).map(x=><div key={x}><h3 className="mb-1 text-sm font-semibold opacity-70">{x}</h3>{l.filter(i=>i.c===x).map(i=><div key={i.id} className="card mb-1 flex items-center gap-3 py-2"><input type="checkbox" checked={i.done} onChange={()=>setL(l.map(o=>o.id===i.id?{...o,done:!o.done}:o))}/><span className={`flex-1 ${i.done?'line-through opacity-50':''}`}>{i.t} ×{i.q}</span><button onClick={()=>setL(l.filter(o=>o.id!==i.id))}>✕</button></div>)}</div>)}
{l.some(i=>i.done)&&<button className="btn" onClick={()=>setL(l.filter(i=>!i.done))}>Clear checked</button>}</div>}
