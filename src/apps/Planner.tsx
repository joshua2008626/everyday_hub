import{useState}from'react'
import{useKV}from'../hooks/useKV'
type P={id:number;date:string;time:string;text:string;pri:string;done:boolean}
export default function Planner(){
const[ps,setPs]=useKV<P[]>('planner',[]);const[date,setDate]=useState(new Date().toISOString().slice(0,10));const[time,setTime]=useState('09:00');const[text,setText]=useState('');const[pri,setPri]=useState('Medium')
const day=ps.filter(p=>p.date===date).sort((a,b)=>a.time.localeCompare(b.time))
return<div className="mx-auto max-w-lg space-y-3"><input className="inp" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
<div className="card flex flex-wrap gap-2"><input className="inp w-28" type="time" value={time} onChange={e=>setTime(e.target.value)}/><input className="inp flex-1" placeholder="What's planned?" value={text} onChange={e=>setText(e.target.value)}/><select className="inp w-28" value={pri} onChange={e=>setPri(e.target.value)}>{['High','Medium','Low'].map(x=><option key={x}>{x}</option>)}</select><button className="btn" onClick={()=>{if(text.trim()){setPs([...ps,{id:Date.now(),date,time,text:text.trim(),pri,done:false}]);setText('')}}}>Add</button></div>
{!day.length&&<p className="py-6 text-center opacity-60">Nothing planned for this day.</p>}
<div className="space-y-2 border-l-2 border-accent pl-4">{day.map(p=><div key={p.id} className="card relative flex items-center gap-3"><span className="absolute -left-[25px] h-3 w-3 rounded-full bg-accent"/><input type="checkbox" checked={p.done} onChange={()=>setPs(ps.map(o=>o.id===p.id?{...o,done:!o.done}:o))}/><div className={`flex-1 ${p.done?'line-through opacity-50':''}`}><b>{p.time}</b> {p.text}<span className="ml-2 text-xs opacity-60">{p.pri}</span></div><button onClick={()=>setPs(ps.filter(o=>o.id!==p.id))}>✕</button></div>)}</div></div>}
