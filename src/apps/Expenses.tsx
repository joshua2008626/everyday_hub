import{useState}from'react'
import{useKV}from'../hooks/useKV'
type E={id:number;amt:number;type:'in'|'out';cat:string;date:string;note:string}
const CATS=['Food','Transport','Bills','Shopping','Health','Salary','Other']
export default function Expenses(){
const[es,setEs]=useKV<E[]>('expenses',[]);const[amt,setAmt]=useState('');const[type,setType]=useState<'in'|'out'>('out');const[cat,setCat]=useState('Food');const[note,setNote]=useState('')
const month=new Date().toISOString().slice(0,7);const m=es.filter(e=>e.date.startsWith(month))
const inc=m.filter(e=>e.type==='in').reduce((s,e)=>s+e.amt,0),out=m.filter(e=>e.type==='out').reduce((s,e)=>s+e.amt,0)
const by=CATS.map(c=>[c,m.filter(e=>e.type==='out'&&e.cat===c).reduce((s,e)=>s+e.amt,0)] as const).filter(x=>x[1]>0)
const csv=()=>{const t='date,type,category,amount,note\n'+es.map(e=>[e.date,e.type,e.cat,e.amt,`"${e.note.replace(/"/g,'""')}"`].join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='expenses.csv';a.click()}
return<div className="mx-auto max-w-lg space-y-3"><div className="grid grid-cols-3 gap-2 text-center"><div className="card">In<br/><b>{inc.toFixed(2)}</b></div><div className="card">Out<br/><b>{out.toFixed(2)}</b></div><div className="card">Net<br/><b>{(inc-out).toFixed(2)}</b></div></div>
<div className="flex flex-wrap gap-2"><select className="inp w-24" value={type} onChange={e=>setType(e.target.value as 'in'|'out')}><option value="out">Expense</option><option value="in">Income</option></select><select className="inp w-32" value={cat} onChange={e=>setCat(e.target.value)}>{CATS.map(c=><option key={c}>{c}</option>)}</select>
<input className="inp w-28" type="number" placeholder="Amount" value={amt} onChange={e=>setAmt(e.target.value)}/><input className="inp flex-1" placeholder="Note" value={note} onChange={e=>setNote(e.target.value)}/>
<button className="btn" onClick={()=>{if(+amt>0){setEs([{id:Date.now(),amt:+amt,type,cat,note,date:new Date().toISOString().slice(0,10)},...es]);setAmt('');setNote('')}}}>Add</button></div>
{by.length>0&&<div className="card space-y-1"><b>This month by category</b>{by.map(([c,v])=><div key={c} className="flex items-center gap-2 text-sm"><span className="w-20">{c}</span><div className="h-2 rounded bg-accent" style={{width:`${v/out*100}%`}}/><span>{v.toFixed(0)}</span></div>)}</div>}
{es.slice(0,20).map(e=><div key={e.id} className="card flex justify-between text-sm"><span>{e.date} · {e.cat}{e.note&&` · ${e.note}`}</span><span className={e.type==='in'?'text-green-500':''}>{e.type==='in'?'+':'−'}{e.amt}<button className="ml-2 opacity-50" onClick={()=>setEs(es.filter(o=>o.id!==e.id))}>✕</button></span></div>)}
{!es.length&&<p className="py-6 text-center opacity-60">No entries yet.</p>}<button className="btn" onClick={csv}>Export CSV</button></div>}
