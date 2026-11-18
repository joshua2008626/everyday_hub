import{useState}from'react'
export default function Json(){
const[s,setS]=useState('{"hello":"world","list":[1,2,3]}');const[err,setErr]=useState('')
const run=(f:(v:any)=>string)=>{try{setS(f(JSON.parse(s)));setErr('')}catch(e:any){setErr(e.message)}}
return<div className="space-y-3"><textarea className="inp h-72 font-mono text-sm" spellCheck={false} value={s} onChange={e=>setS(e.target.value)}/>
<div className="flex flex-wrap gap-2"><button className="btn" onClick={()=>run(v=>JSON.stringify(v,null,2))}>Format</button><button className="btn" onClick={()=>run(v=>JSON.stringify(v))}>Minify</button><button className="btn" onClick={()=>navigator.clipboard?.writeText(s)}>Copy</button></div>
<p className={err?'text-red-400':'text-green-500'}>{err||'Valid JSON'}</p></div>}
