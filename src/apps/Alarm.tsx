import{useEffect,useRef,useState}from'react'
import{useKV}from'../hooks/useKV'
import{beep}from'./Timer'
type A={id:number;t:string;label:string;rep:string;on:boolean;snd:string}
const ring=(s:string)=>{const n=s==='Long'?1:s==='Double'?2:4;for(let i=0;i<n;i++)setTimeout(beep,i*(s==='Long'?0:800));if(s==='Long')setTimeout(beep,700)}
export default function Alarm(){
const[as,setAs]=useKV<A[]>('alarms',[]);const[t,setT]=useState('07:00');const[l,setL]=useState('');const[rep,setRep]=useState('Once');const[snd,setSnd]=useState('Beep');const[fire,setFire]=useState<A|null>(null)
const ref=useRef(as);ref.current=as;const done=useRef('')
useEffect(()=>{const i=setInterval(()=>{const n=new Date(),hm=n.toTimeString().slice(0,5),day=n.getDay();ref.current.forEach(a=>{const k=`${a.id}${n.toDateString()}${hm}`;if(!a.on||a.t!==hm||done.current===k)return;if(a.rep==='Weekdays'&&(day===0||day===6))return;done.current=k;setFire(a);ring(a.snd);if(a.rep==='Once')setAs(ref.current.map(o=>o.id===a.id?{...o,on:false}:o))})},1000);return()=>clearInterval(i)},[])
return<div className="mx-auto max-w-lg space-y-3"><p className="card text-sm">Alarms only ring while this page is open in a tab. Browsers cannot wake a closed page, so do not rely on this for anything critical.</p>
{fire&&<div className="card flex items-center justify-between ring-2 ring-accent"><b>⏰ {fire.label||fire.t}</b><button className="btn" onClick={()=>setFire(null)}>Dismiss</button></div>}
<div className="card flex flex-wrap gap-2"><input className="inp w-32" type="time" value={t} onChange={e=>setT(e.target.value)}/><input className="inp flex-1" placeholder="Label" value={l} onChange={e=>setL(e.target.value)}/>
<select className="inp w-28" value={rep} onChange={e=>setRep(e.target.value)}>{['Once','Daily','Weekdays'].map(x=><option key={x}>{x}</option>)}</select><select className="inp w-24" value={snd} onChange={e=>setSnd(e.target.value)}>{['Beep','Double','Long'].map(x=><option key={x}>{x}</option>)}</select>
<button className="btn" onClick={()=>setAs([...as,{id:Date.now(),t,label:l,rep,on:true,snd}])}>Add</button></div>
{as.map(a=><div key={a.id} className="card flex items-center justify-between"><div><b className="text-2xl">{a.t}</b><div className="text-sm opacity-70">{a.label} · {a.rep} · {a.snd}</div></div><div className="flex gap-3"><input type="checkbox" checked={a.on} onChange={()=>setAs(as.map(o=>o.id===a.id?{...o,on:!o.on}:o))}/><button onClick={()=>setAs(as.filter(o=>o.id!==a.id))}>✕</button></div></div>)}</div>}
