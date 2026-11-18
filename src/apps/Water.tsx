import{useKV}from'../hooks/useKV'
import{useState}from'react'
const today=()=>new Date().toISOString().slice(0,10)
export default function Water(){
const[s,setS]=useKV<{target:number;log:Record<string,number>}>('water',{target:2000,log:{}});const[c,setC]=useState('')
const t=s.log[today()]||0;const add=(n:number)=>setS({...s,log:{...s.log,[today()]:Math.max(0,t+n)}})
return<div className="mx-auto max-w-xs space-y-3 text-center"><div className="card"><div className="text-4xl">{t} ml</div><div className="my-2 h-3 overflow-hidden rounded bg-slate-500/20"><div className="h-full bg-accent transition-all" style={{width:Math.min(100,t/s.target*100)+'%'}}/></div><div className="text-sm opacity-70">Target {s.target} ml{t>=s.target&&' · reached!'}</div></div>
<div className="flex justify-center gap-2">{[150,250,500].map(n=><button key={n} className="btn" onClick={()=>add(n)}>+{n}</button>)}<button className="btn" onClick={()=>add(-250)}>−250</button></div>
<div className="flex gap-2"><input className="inp" type="number" placeholder="Custom amount (ml)" value={c} onChange={e=>setC(e.target.value)}/><button className="btn" onClick={()=>{add(+c||0);setC('')}}>Add</button></div>
<label className="block text-sm">Daily target (ml)<input className="inp" type="number" value={s.target} onChange={e=>setS({...s,target:+e.target.value||1})}/></label></div>}
