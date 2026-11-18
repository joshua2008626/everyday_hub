import{useState}from'react'
import{Countdown}from'./Timer'
import{useKV}from'../hooks/useKV'
export default function Study(){
const[sub,setSub]=useState('General');const[mins,setMins]=useState(25);const[log,setLog]=useKV<{at:number;sub:string;min:number}[]>('study-log',[])
const tot:Record<string,number>={};log.forEach(l=>tot[l.sub]=(tot[l.sub]||0)+l.min)
return<div className="mx-auto max-w-sm space-y-3"><input className="inp" placeholder="Subject" value={sub} onChange={e=>setSub(e.target.value||'General')}/>
<Countdown key={mins} presets={[]} initial={mins} onDone={()=>setLog([{at:Date.now(),sub,min:mins},...log])}/>
<label className="block text-center text-sm">Session length (min)<input className="inp" type="number" min={1} value={mins} onChange={e=>setMins(+e.target.value||1)}/></label>
<div className="card text-sm"><b>Study time by subject</b>{Object.entries(tot).map(([k,v])=><div key={k} className="flex justify-between"><span>{k}</span><span>{v} min</span></div>)}{!log.length&&<p className="opacity-60">Finished sessions appear here.</p>}</div></div>}
