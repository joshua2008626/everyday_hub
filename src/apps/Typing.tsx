import{useRef,useState}from'react'
import{useKV}from'../hooks/useKV'
const S=['The quick brown fox jumps over the lazy dog.','Practice makes progress, not perfection.','Small steps every day lead to big results.','Typing fast is easy when you stay relaxed.','Good tools should be simple, private and fast.']
export default function Typing(){
const[i,setI]=useState(0);const[v,setV]=useState('');const t0=useRef(0);const[best,setBest]=useKV('typing-best',0);const[res,setRes]=useState<{w:number;a:number}|null>(null)
const target=S[i]
const on=(x:string)=>{if(res)return;if(!t0.current)t0.current=Date.now();setV(x);if(x.length>=target.length){const m=(Date.now()-t0.current)/60000,ok=[...x].filter((c,k)=>c===target[k]).length;const w=Math.round(target.length/5/m),a=Math.round(ok/x.length*100);setRes({w,a});if(w>best)setBest(w)}}
const next=()=>{setI((i+1)%S.length);setV('');setRes(null);t0.current=0}
return<div className="mx-auto max-w-xl space-y-3"><p className="card font-mono text-lg">{[...target].map((c,k)=><span key={k} className={k<v.length?(v[k]===c?'text-green-500':'bg-red-500/30 text-red-400'):'opacity-60'}>{c}</span>)}</p>
<input className="inp font-mono" autoFocus placeholder="Start typing…" value={v} onChange={e=>on(e.target.value)} disabled={!!res}/>
{res&&<div className="card text-center"><div className="text-3xl">{res.w} WPM</div><div>Accuracy {res.a}%</div></div>}
<div className="flex items-center justify-between"><span className="text-sm opacity-70">Best: {best} WPM</span><button className="btn" onClick={next}>{res?'Next sentence':'Skip'}</button></div></div>}
