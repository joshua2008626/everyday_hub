import{useRef,useState}from'react'
export default function Video(){
const[q,setQ]=useState<{n:string;u:string}[]>([]);const[i,setI]=useState(0);const v=useRef<HTMLVideoElement>(null)
return<div className="mx-auto max-w-2xl space-y-3"><label className="btn inline-block cursor-pointer">Choose videos<input hidden type="file" accept="video/*" multiple onChange={e=>{const f=Array.from(e.target.files||[]).map(x=>({n:x.name,u:URL.createObjectURL(x)}));if(f.length){setQ(f);setI(0)}}}/></label>
{q[i]?<><video ref={v} key={q[i].u} src={q[i].u} controls autoPlay playsInline className="w-full rounded-xl bg-black" onEnded={()=>i<q.length-1&&setI(i+1)}/>
<div className="flex flex-wrap items-center gap-2"><select className="inp w-24" defaultValue="1" onChange={e=>{if(v.current)v.current.playbackRate=+e.target.value}}>{[.5,.75,1,1.25,1.5,2].map(r=><option key={r} value={r}>{r}×</option>)}</select><button className="btn" onClick={()=>v.current?.requestFullscreen?.()}>Full screen</button></div>
{q.length>1&&q.map((x,k)=><button key={x.u} className={`card block w-full truncate text-left text-sm ${k===i?'ring-2 ring-accent':''}`} onClick={()=>setI(k)}>{x.n}</button>)}</>:<p className="py-10 text-center opacity-60">Choose video files from your device to play them.</p>}
<p className="text-xs opacity-60">Videos play from your device and are not stored in the app, so you will need to choose them again next time. Supported formats depend on your browser.</p></div>}
