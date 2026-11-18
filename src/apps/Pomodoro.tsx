import{useState}from'react'
import{Countdown}from'./Timer'
import{useKV}from'../hooks/useKV'
export default function Pomodoro(){
const[focus,setFocus]=useState(true);const[fm,setFm]=useState(25);const[bm,setBm]=useState(5)
const[log,setLog]=useKV<{at:number;min:number}[]>('pomodoro-log',[])
return<div><div className="mb-2 flex justify-center gap-3 text-sm"><label>Focus <input className="inp inline w-16" type="number" value={fm} onChange={e=>setFm(+e.target.value||1)}/></label><label>Break <input className="inp inline w-16" type="number" value={bm} onChange={e=>setBm(+e.target.value||1)}/></label></div>
<p className="text-center font-semibold">{focus?'Focus session':'Break'}</p>
<Countdown key={String(focus)+fm+bm} presets={[]} initial={focus?fm:bm} onDone={()=>{if(focus)setLog([{at:Date.now(),min:fm},...log]);setFocus(!focus)}}/>
<p className="mt-4 text-center text-sm opacity-70">Sessions completed: {log.length} · Today: {log.filter(l=>new Date(l.at).toDateString()===new Date().toDateString()).length}</p></div>}
