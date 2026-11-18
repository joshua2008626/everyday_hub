import{useState}from'react'
import{db}from'../db'
const OK=new Set(['Math','PI','E','sin','cos','tan','asin','acos','atan','sqrt','abs','exp','log','log10','pow','dsin','dcos','dtan'])
const rad=(x:number)=>x*Math.PI/180
function ev(s:string,deg:boolean):number{
let x=s.replace(/π/g,'PI').replace(/√\(/g,'sqrt(').replace(/\^/g,'**').replace(/(\d+(\.\d+)?)%/g,'($1/100)').replace(/\bln\(/g,'log(').replace(/\blog\(/g,'log10(').replace(/\be\b/g,'E')
x=x.replace(/\b(sin|cos|tan)\(/g,(_,f)=>deg?`d${f}(`:`${f}(`)
if(!/^[\w+\-*/().,\s]+$/.test(x)||(x.match(/[A-Za-z_]\w*/g)||[]).some(w=>!OK.has(w)))throw new Error('bad')
const ctx:any={...Object.fromEntries(['sin','cos','tan','asin','acos','atan','sqrt','abs','exp','log10'].map(k=>[k,(Math as any)[k]])),log:Math.log,PI:Math.PI,E:Math.E,dsin:(a:number)=>Math.sin(rad(a)),dcos:(a:number)=>Math.cos(rad(a)),dtan:(a:number)=>Math.tan(rad(a))}
const r=Function(...Object.keys(ctx),`"use strict";return (${x})`)(...Object.values(ctx));if(typeof r!=='number'||!isFinite(r))throw new Error('bad');return r}
export default function Sci(){
const[e,setE]=useState('');const[r,setR]=useState('');const[deg,setDeg]=useState(true)
const eq=()=>{try{const v=+ev(e,deg).toPrecision(12);setR(String(v));db.calcHistory.add({expr:e,result:String(v),at:Date.now()});setE(String(v))}catch{setR('Error')}}
const keys=['sin(','cos(','tan(','log(','ln(','√(','^','π','(',')','7','8','9','/','asin(','4','5','6','*','acos(','1','2','3','-','atan(','0','.','%','+','e']
return<div className="mx-auto max-w-sm space-y-2"><div className="card text-right"><div className="min-h-6 text-sm opacity-60">{r}</div><input className="inp text-right text-2xl" value={e} onChange={x=>setE(x.target.value)} onKeyDown={k=>k.key==='Enter'&&eq()}/></div>
<div className="grid grid-cols-5 gap-2">{keys.map(k=><button key={k} className="card py-3" onClick={()=>setE(e+k)}>{k}</button>)}</div>
<div className="flex gap-2"><button className="btn flex-1" onClick={()=>setDeg(!deg)}>{deg?'DEG':'RAD'}</button><button className="btn flex-1" onClick={()=>{setE('');setR('')}}>Clear</button><button className="btn flex-1" onClick={()=>setE(e.slice(0,-1))}>⌫</button><button className="btn flex-1" onClick={eq}>=</button></div></div>}
