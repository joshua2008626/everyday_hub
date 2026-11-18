import{useState}from'react'
const r=(a:number,b:number)=>a+Math.floor(Math.random()*(b-a+1))
type Q={t:string;a:number}
const gen=(k:string):Q=>{if(k==='Arithmetic'){const a=r(2,30),b=r(2,30),o=['+','-','×'][r(0,2)];return{t:`${a} ${o} ${b}`,a:o==='+'?a+b:o==='-'?a-b:a*b}}
if(k==='Algebra'){const a=r(2,9),x=r(-9,9),b=r(1,20);return{t:`Solve for x: ${a}x + ${b} = ${a*x+b}`,a:x}}
const w=r(2,15),h=r(2,15),m=r(0,2);return m===0?{t:`Area of a ${w}×${h} rectangle`,a:w*h}:m===1?{t:`Perimeter of a ${w}×${h} rectangle`,a:2*(w+h)}:{t:`Area of a triangle with base ${w*2} and height ${h}`,a:w*h}}
export default function MathPrac(){
const[k,setK]=useState('Arithmetic');const[q,setQ]=useState(()=>gen('Arithmetic'));const[v,setV]=useState('');const[ok,setOk]=useState(0);const[n,setN]=useState(0);const[fb,setFb]=useState('')
const sub=()=>{if(v==='')return;const c=+v===q.a;setN(n+1);if(c)setOk(ok+1);setFb(c?'Correct!':`Not quite. Answer: ${q.a}`);setV('');setQ(gen(k))}
return<div className="mx-auto max-w-sm space-y-3 text-center"><div className="flex justify-center gap-2">{['Arithmetic','Algebra','Geometry'].map(x=><button key={x} className={`card px-3 py-1 ${k===x?'ring-2 ring-accent':''}`} onClick={()=>{setK(x);setQ(gen(x));setFb('')}}>{x}</button>)}</div>
<div className="card py-8 text-2xl">{q.t}</div><input className="inp text-center" type="number" autoFocus value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sub()}/>
<button className="btn" onClick={sub}>Check</button><p className="h-6">{fb}</p><p className="text-sm opacity-70">Score {ok}/{n}</p></div>}
