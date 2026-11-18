import{useEffect,useState}from'react'
import{useKV}from'../hooks/useKV'
export type Src={h:string;c:string;j:string}
export function Playground({k,init}:{k:string;init:Src}){
const[v,setV]=useKV<Src>(k,init);const[tab,setTab]=useState<keyof Src>('h');const[run,setRun]=useState(v)
useEffect(()=>{const t=setTimeout(()=>setRun(v),500);return()=>clearTimeout(t)},[v])
const L={h:'HTML',c:'CSS',j:'JavaScript'}
return<div className="space-y-2"><div className="flex gap-2">{(Object.keys(L) as (keyof Src)[]).map(x=><button key={x} className={`card px-3 py-1 ${tab===x?'ring-2 ring-accent':''}`} onClick={()=>setTab(x)}>{L[x]}</button>)}<button className="btn ml-auto py-1" onClick={()=>setV(init)}>Reset</button></div>
<div className="grid gap-3 md:grid-cols-2"><textarea className="inp h-80 font-mono text-sm" spellCheck={false} value={v[tab]} onChange={e=>setV({...v,[tab]:e.target.value})}/>
<iframe title="preview" sandbox="allow-scripts" className="h-80 w-full rounded-xl bg-white" srcDoc={`<style>${run.c}</style>${run.h}<script>${run.j}<\/script>`}/></div></div>}
export default function Html(){return<Playground k="playground" init={{h:'<h1>Hello</h1>\n<button id="b">Click me</button>',c:'body{font-family:sans-serif;padding:16px}',j:"document.getElementById('b').onclick=()=>alert('Hi!')"}}/>}
