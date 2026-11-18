import{useState}from'react'
import{db}from'../db'
import{useLiveQuery}from'dexie-react-hooks'
function evalSafe(s:string){if(!/^[\d+\-*/().%\s]+$/.test(s))throw 0;return Function(`"use strict";return (${s.replace(/(\d+(\.\d+)?)%/g,'($1/100)')})`)()}
export default function Calculator(){
const[e,setE]=useState('');const[r,setR]=useState('')
const hist=useLiveQuery(()=>db.calcHistory.orderBy('at').reverse().limit(8).toArray(),[])
const eq=()=>{try{const v=String(evalSafe(e));setR(v);db.calcHistory.add({expr:e,result:v,at:Date.now()});setE(v)}catch{setR('Error')}}
const keys='C ( ) / 7 8 9 * 4 5 6 - 1 2 3 + 0 . % ='.split(' ')
return<div className="mx-auto max-w-xs" tabIndex={0} onKeyDown={k=>{if(k.key==='Enter')eq();else if(k.key==='Backspace')setE(e.slice(0,-1));else if(/^[\d+\-*/().%]$/.test(k.key))setE(e+k.key)}}>
<div className="card mb-3 text-right"><div className="min-h-6 text-sm opacity-60">{r}</div><div className="min-h-9 text-3xl">{e||'0'}</div></div>
<div className="grid grid-cols-4 gap-2">{keys.map(k=><button key={k} className="card py-3 text-lg" onClick={()=>k==='C'?(setE(''),setR('')):k==='='?eq():setE(e+k)}>{k}</button>)}</div>
<ul className="mt-4 space-y-1 text-sm opacity-70">{hist?.map(h=><li key={h.id}>{h.expr} = {h.result}</li>)}</ul></div>}
