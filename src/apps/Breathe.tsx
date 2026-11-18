import{useEffect,useState}from'react'
const P=[['Inhale',4,1.5],['Hold',4,1.5],['Exhale',6,1],['Hold',2,1]] as const
export default function Breathe(){
const[on,setOn]=useState(false);const[p,setP]=useState(0);const[mins,setMins]=useState(2);const[left,setLeft]=useState(0)
useEffect(()=>{if(!on)return;const t=setTimeout(()=>setP((p+1)%4),P[p][1]*1000);return()=>clearTimeout(t)},[on,p])
useEffect(()=>{if(!on)return;const i=setInterval(()=>setLeft(l=>{if(l<=1){setOn(false);return 0}return l-1}),1000);return()=>clearInterval(i)},[on])
const start=()=>{setP(0);setLeft(mins*60);setOn(true)}
return<div className="mx-auto max-w-xs space-y-4 text-center"><div className="flex h-64 items-center justify-center"><div className="flex h-32 w-32 items-center justify-center rounded-full bg-accent text-ink" style={{transform:`scale(${on?P[p][2]:1})`,transition:`transform ${P[p][1]}s ease-in-out`}}>{on?P[p][0]:'Ready'}</div></div>
{on&&<p>{Math.floor(left/60)}:{String(left%60).padStart(2,'0')} left</p>}
<label className="block text-sm">Minutes<input className="inp" type="number" min={1} value={mins} onChange={e=>setMins(+e.target.value||1)}/></label>
<button className="btn" onClick={()=>on?setOn(false):start()}>{on?'Stop':'Start'}</button></div>}
