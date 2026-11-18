import{useState}from'react'
import{useKV}from'../hooks/useKV'
export default function Ruler(){
const[k,setK]=useKV('ruler-scale',1);const[inch,setInch]=useState(false);const[m,setM]=useState('')
const pxmm=96/25.4*k;const n=inch?12*16:200;const step=inch?25.4/16:1
return<div className="space-y-3"><p className="card text-sm">Approximate only. Screen sizes differ, so calibrate below with a real ruler.</p>
<div className="flex gap-2"><button className="btn" onClick={()=>setInch(!inch)}>{inch?'Show cm/mm':'Show inches'}</button></div>
<div className="overflow-x-auto"><div className="relative h-20 border-b-2 border-accent" style={{width:n*step*pxmm}}>{Array.from({length:n+1},(_,i)=>{const big=inch?i%16===0:i%10===0,mid=inch?i%8===0:i%5===0;return<div key={i} className="absolute top-0 border-l border-current" style={{left:i*step*pxmm,height:big?40:mid?28:16}}>{big&&<span className="absolute left-1 top-10 text-xs">{inch?i/16:i/10}</span>}</div>})}</div></div>
<div className="card space-y-2"><b>Calibrate</b><div className="rounded bg-accent/40 text-center" style={{width:50*pxmm,height:24}}>this bar should be 50 mm</div>
<div className="flex gap-2"><input className="inp" type="number" placeholder="Measured length in mm" value={m} onChange={e=>setM(e.target.value)}/><button className="btn" onClick={()=>{if(+m>0)setK(k*50/+m)}}>Apply</button><button className="btn" onClick={()=>setK(1)}>Reset</button></div></div></div>}
