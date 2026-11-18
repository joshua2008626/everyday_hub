import{useState}from'react'
const day=86400000,iso=(d:Date)=>d.toISOString().slice(0,10)
export default function Dates(){
const[a,setA]=useState(iso(new Date()));const[b,setB]=useState(iso(new Date(Date.now()+30*day)));const[n,setN]=useState(30);const[dob,setDob]=useState('2000-01-01')
const diff=Math.round((+new Date(b)-+new Date(a))/day)
const age=(()=>{const d=new Date(dob),t=new Date();let y=t.getFullYear()-d.getFullYear(),m=t.getMonth()-d.getMonth();if(m<0||(m===0&&t.getDate()<d.getDate())){y--;m+=12}return`${y} years, ${(m+(t.getDate()<d.getDate()?-1:0)+12)%12} months`})()
return<div className="mx-auto max-w-md space-y-4"><section className="card space-y-2"><h3 className="font-semibold">Difference</h3><input className="inp" type="date" value={a} onChange={e=>setA(e.target.value)}/><input className="inp" type="date" value={b} onChange={e=>setB(e.target.value)}/><p>{diff} days (~{(diff/7).toFixed(1)} weeks)</p></section>
<section className="card space-y-2"><h3 className="font-semibold">Add / subtract days</h3><input className="inp" type="number" value={n} onChange={e=>setN(+e.target.value)}/><p>{a} {n>=0?'+':'−'} {Math.abs(n)} days = {iso(new Date(+new Date(a)+n*day))}</p></section>
<section className="card space-y-2"><h3 className="font-semibold">Age</h3><input className="inp" type="date" value={dob} onChange={e=>setDob(e.target.value)}/><p>{age}</p></section></div>}
