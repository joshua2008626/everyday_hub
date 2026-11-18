import{useEffect,useState}from'react'
import{db}from'../db'
import{beep}from'../apps/Timer'
type R={id:number;text:string;time:string}
export default function Reminders(){
const[due,setDue]=useState<R[]>([])
useEffect(()=>{const chk=async()=>{const r=await db.kv.get('events');const es:any[]=r?.value||[];const fired:number[]=JSON.parse(localStorage.getItem('fired')||'[]');const now=Date.now()
const hit=es.filter(e=>e.remind&&e.time&&!fired.includes(e.id)).filter(e=>{const t=new Date(e.date+'T'+e.time).getTime();return t<=now&&now-t<6*36e5});if(!hit.length)return
localStorage.setItem('fired',JSON.stringify([...fired,...hit.map(e=>e.id)].slice(-500)));setDue(d=>[...d,...hit]);beep();hit.forEach(e=>{try{if(Notification.permission==='granted')new Notification('Reminder: '+e.text,{body:e.time})}catch{}})}
chk();const i=setInterval(chk,20000);return()=>clearInterval(i)},[])
return<div className="fixed inset-x-4 top-4 z-50 space-y-2">{due.map(r=><div key={r.id} className="card flex items-center justify-between ring-2 ring-accent"><span>⏰ {r.time} {r.text}</span><button className="btn py-1" onClick={()=>setDue(due.filter(x=>x.id!==r.id))}>Dismiss</button></div>)}</div>}
