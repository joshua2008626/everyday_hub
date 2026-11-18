import{useState}from'react'
import{useKV}from'../hooks/useKV'
type Q={q:string;o:string[];a:number};type Z={id:number;title:string;qs:Q[]}
export default function Quiz(){
const[zs,setZs]=useKV<Z[]>('quizzes',[]);const[sel,setSel]=useState<number|null>(null);const[play,setPlay]=useState(false);const[i,setI]=useState(0);const[sc,setSc]=useState(0);const[pick,setPick]=useState<number|null>(null)
const[t,setT]=useState('');const[q,setQ]=useState('');const[o,setO]=useState(['','','','']);const[a,setA]=useState(0)
const z=zs.find(x=>x.id===sel);const upd=(n:Z)=>setZs(zs.map(x=>x.id===n.id?n:x))
if(!z)return<div className="mx-auto max-w-lg space-y-3"><div className="flex gap-2"><input className="inp" placeholder="New quiz title" value={t} onChange={e=>setT(e.target.value)}/><button className="btn" onClick={()=>{if(t.trim()){setZs([...zs,{id:Date.now(),title:t.trim(),qs:[]}]);setT('')}}}>Create</button></div>
{!zs.length&&<p className="py-8 text-center opacity-60">Create a quiz and add questions.</p>}{zs.map(x=><div key={x.id} className="card flex cursor-pointer justify-between" onClick={()=>{setSel(x.id);setPlay(false)}}><b>{x.title}</b><span className="text-sm opacity-70">{x.qs.length} questions</span></div>)}</div>
if(play){if(i>=z.qs.length)return<div className="card mx-auto max-w-sm space-y-3 text-center"><div className="text-4xl">{sc}/{z.qs.length}</div><p>{Math.round(sc/z.qs.length*100)}%</p><button className="btn" onClick={()=>{setPlay(false)}}>Done</button></div>
const c=z.qs[i];return<div className="mx-auto max-w-lg space-y-2"><p className="text-sm opacity-60">Question {i+1} of {z.qs.length}</p><h3 className="text-xl">{c.q}</h3>
{c.o.map((x,k)=><button key={k} className={`card block w-full text-left ${pick!==null&&k===c.a?'ring-2 ring-green-500':pick===k?'ring-2 ring-red-500':''}`} onClick={()=>{if(pick===null){setPick(k);if(k===c.a)setSc(sc+1)}}}>{x}</button>)}
{pick!==null&&<button className="btn" onClick={()=>{setPick(null);setI(i+1)}}>Next</button>}</div>}
return<div className="mx-auto max-w-lg space-y-3"><div className="flex items-center justify-between"><button onClick={()=>setSel(null)}>← Quizzes</button><b>{z.title}</b><button className="btn py-1" disabled={!z.qs.length} onClick={()=>{setPlay(true);setI(0);setSc(0);setPick(null)}}>Play</button></div>
<div className="card space-y-2"><input className="inp" placeholder="Question" value={q} onChange={e=>setQ(e.target.value)}/>{o.map((x,k)=><div key={k} className="flex items-center gap-2"><input type="radio" checked={a===k} onChange={()=>setA(k)} aria-label="correct"/><input className="inp" placeholder={`Option ${k+1}`} value={x} onChange={e=>setO(o.map((v,j)=>j===k?e.target.value:v))}/></div>)}
<p className="text-xs opacity-60">Select the radio button next to the correct answer.</p><button className="btn w-full" onClick={()=>{const op=o.map((x,k)=>({x:x.trim(),k})).filter(v=>v.x),ai=op.findIndex(v=>v.k===a);if(q.trim()&&op.length>=2&&ai>=0){upd({...z,qs:[...z.qs,{q:q.trim(),o:op.map(v=>v.x),a:ai}]});setQ('');setO(['','','','']);setA(0)}}}>Add question</button></div>
{z.qs.map((x,k)=><div key={k} className="card flex justify-between text-sm"><span>{x.q}</span><button onClick={()=>upd({...z,qs:z.qs.filter((_,j)=>j!==k)})}>✕</button></div>)}
<button className="text-xs opacity-50" onClick={()=>{setZs(zs.filter(x=>x.id!==z.id));setSel(null)}}>Delete quiz</button></div>}
