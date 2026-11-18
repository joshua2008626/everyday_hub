import{useRef,useState}from'react'
import{useLiveQuery}from'dexie-react-hooks'
import{db}from'../db'
export default function Voice(){
const recs=useLiveQuery(()=>db.audio.orderBy('at').reverse().toArray(),[])||[];const[rec,setRec]=useState(false);const[err,setErr]=useState('');const mr=useRef<MediaRecorder|null>(null);const t0=useRef(0)
const start=async()=>{try{const s=await navigator.mediaDevices.getUserMedia({audio:true});const r=new MediaRecorder(s),ch:Blob[]=[];r.ondataavailable=e=>ch.push(e.data);r.onstop=()=>{s.getTracks().forEach(t=>t.stop());db.audio.add({at:Date.now(),dur:Math.round((Date.now()-t0.current)/1000),type:r.mimeType,blob:new Blob(ch,{type:r.mimeType})})};t0.current=Date.now();r.start();mr.current=r;setRec(true);setErr('')}catch{setErr('Microphone access was denied or is unavailable. It needs HTTPS and your permission.')}}
return<div className="mx-auto max-w-md space-y-3"><button className={`btn w-full py-6 text-xl ${rec?'bg-red-400':''}`} onClick={rec?()=>{mr.current?.stop();setRec(false)}:start}>{rec?'■ Stop recording':'● Start recording'}</button>{err&&<p className="text-sm text-red-400">{err}</p>}
{!recs.length&&<p className="py-6 text-center opacity-60">No recordings yet.</p>}
{recs.map(r=>{const u=URL.createObjectURL(r.blob);return<div key={r.id} className="card space-y-2 text-sm"><div className="flex justify-between"><span>{new Date(r.at).toLocaleString()} · {r.dur}s</span><button onClick={()=>db.audio.delete(r.id!)}>✕</button></div><audio controls src={u} className="w-full"/><a className="underline" href={u} download={`recording-${r.at}.${r.type.includes('mp4')?'m4a':'webm'}`}>Download</a></div>})}
<p className="text-xs opacity-60">Recordings are stored on this device and are not included in JSON backups. Download any you want to keep.</p></div>}
