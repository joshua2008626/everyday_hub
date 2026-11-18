import{useEffect,useRef,useState}from'react'
import{useKV}from'../hooks/useKV'
const today=()=>new Date().toISOString().slice(0,10)
export default function Steps(){
const[log,setLog]=useKV<Record<string,number>>('steps',{});const[on,setOn]=useState(false);const[msg,setMsg]=useState('');const[m,setM]=useState('')
const L=useRef(log);L.current=log;const last=useRef(0);const sm=useRef(9.8);const prev=useRef(0)
const add=(n:number)=>{const l={...L.current,[today()]:(L.current[today()]||0)+n};L.current=l;setLog(l)}
const h=(e:DeviceMotionEvent)=>{const a=e.accelerationIncludingGravity;if(!a)return;const mag=Math.hypot(a.x||0,a.y||0,a.z||0);sm.current=sm.current*.8+mag*.2;const d=mag-sm.current,now=Date.now()
if(d>2.2&&prev.current<=2.2&&now-last.current>300){last.current=now;add(1)}prev.current=d}
const start=async()=>{try{const D:any=DeviceMotionEvent;if(typeof D?.requestPermission==='function'&&(await D.requestPermission())!=='granted')return setMsg('Permission denied. Use manual logging.');addEventListener('devicemotion',h);setOn(true);setMsg('Counting. Keep this page open.')}catch{setMsg('Motion sensor not available. Use manual logging.')}}
useEffect(()=>()=>removeEventListener('devicemotion',h),[])
const days=Object.entries(log).sort().reverse().slice(0,7)
return<div className="mx-auto max-w-xs space-y-3 text-center"><div className="card"><div className="text-5xl">{log[today()]||0}</div><div className="opacity-70">steps today</div></div>
<button className="btn w-full" onClick={on?()=>{removeEventListener('devicemotion',h);setOn(false)}:start}>{on?'Stop counting':'Start counting'}</button>{msg&&<p className="text-sm opacity-70">{msg}</p>}
<div className="flex gap-2"><input className="inp" type="number" placeholder="Add steps manually" value={m} onChange={e=>setM(e.target.value)}/><button className="btn" onClick={()=>{if(+m)add(+m);setM('')}}>Add</button></div>
<div className="card text-left text-sm">{days.map(([d,n])=><div key={d} className="flex justify-between"><span>{d}</span><b>{n}</b></div>)}</div>
<p className="text-xs opacity-60">Phone sensor counting is approximate and only works while this page stays open. Manual logging is always available.</p></div>}
