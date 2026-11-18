import{useState}from'react'
import{useKV}from'../hooks/useKV'
type F={id:number;name:string;text:string}
export default function TextEd(){
const[fs,setFs]=useKV<F[]>('textfiles',[]);const[sel,setSel]=useState<number|null>(null);const f=fs.find(x=>x.id===sel)
const upd=(p:Partial<F>)=>setFs(fs.map(x=>x.id===sel?{...x,...p}:x))
const open=async(file:File)=>{const id=Date.now();setFs([...fs,{id,name:file.name,text:await file.text()}]);setSel(id)}
const dl=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([f!.text],{type:'text/plain'}));a.download=f!.name;a.click()}
return<div className="grid gap-4 md:grid-cols-[220px_1fr]"><div className="space-y-2"><button className="btn w-full" onClick={()=>{const id=Date.now();setFs([...fs,{id,name:`untitled-${fs.length+1}.txt`,text:''}]);setSel(id)}}>New file</button>
<label className="card block cursor-pointer text-center text-sm">Open from device<input type="file" accept="text/*,.md,.json,.csv,.js,.css,.html" hidden onChange={e=>e.target.files?.[0]&&open(e.target.files[0])}/></label>
{fs.map(x=><div key={x.id} className={`card cursor-pointer text-sm ${x.id===sel?'ring-2 ring-accent':''}`} onClick={()=>setSel(x.id)}>{x.name}</div>)}</div>
{f?<div className="space-y-2"><input className="inp" value={f.name} onChange={e=>upd({name:e.target.value})}/><textarea className="inp h-80 font-mono text-sm" value={f.text} onChange={e=>upd({text:e.target.value})}/><div className="flex gap-2"><button className="btn" onClick={dl}>Download</button><button className="btn" onClick={()=>{setFs(fs.filter(x=>x.id!==f.id));setSel(null)}}>Delete</button></div></div>:<p className="py-10 text-center opacity-60">Create or open a file.</p>}</div>}
