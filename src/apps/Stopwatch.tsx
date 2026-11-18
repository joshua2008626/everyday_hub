import{useEffect,useRef,useState}from'react'
const f=(ms:number)=>`${String(Math.floor(ms/60000)).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(Math.floor(ms/10)%100).padStart(2,'0')}`
export default function Stopwatch(){
const[t,setT]=useState(0);const[on,setOn]=useState(false);const[laps,setLaps]=useState<number[]>([]);const base=useRef(0)
useEffect(()=>{if(!on)return;base.current=performance.now()-t;const i=setInterval(()=>setT(performance.now()-base.current),30);return()=>clearInterval(i)},[on])
return<div className="mx-auto max-w-xs text-center"><div className="card my-4 text-5xl tabular-nums">{f(t)}</div>
<div className="flex justify-center gap-2"><button className="btn" onClick={()=>setOn(!on)}>{on?'Pause':'Start'}</button><button className="btn" onClick={()=>on?setLaps([t,...laps]):(setT(0),setLaps([]))}>{on?'Lap':'Reset'}</button></div>
<ol className="mt-4 space-y-1 text-sm">{laps.map((l,i)=><li key={i}>Lap {laps.length-i}: {f(l)}</li>)}</ol></div>}
