import{useEffect,useState}from'react'
import{db}from'../db'
const mb=(n?:number)=>n==null?'unknown':(n/1048576).toFixed(1)+' MB'
export function Status(){
const[on,setOn]=useState(navigator.onLine);const[info,setI]=useState<any>({})
useEffect(()=>{const a=()=>setOn(true),b=()=>setOn(false);addEventListener('online',a);addEventListener('offline',b);return()=>{removeEventListener('online',a);removeEventListener('offline',b)}},[])
useEffect(()=>{(async()=>{const o:any={};try{const ks=await caches.keys();o.caches=ks.length;let n=0;for(const k of ks)n+=(await (await caches.open(k)).keys()).length;o.files=n}catch{}
try{const e=await navigator.storage.estimate();o.used=e.usage;o.quota=e.quota}catch{}
o.sw='serviceWorker' in navigator?!!(await navigator.serviceWorker.getRegistration()):false
o.notes=await db.notes.count();o.kv=await db.kv.count();setI(o)})()},[])
const t=localStorage.getItem('offlineReady');const row=(a:string,b:any)=><div className="flex justify-between border-b border-white/10 py-2"><span>{a}</span><b>{b}</b></div>
return<div className="mx-auto max-w-md"><h2 className="mb-3 text-2xl font-bold">Offline Status</h2><div className="card">
{row('Connection',on?'Online':'Offline')}{row('Service worker',info.sw?'Active':'Not active (needs HTTPS and a production build)')}{row('Cached files',info.files??'not available')}{row('Last cached',t?new Date(+t).toLocaleString():'not yet')}{row('Storage used',mb(info.used))}{row('Storage quota',mb(info.quota))}{row('Saved notes',info.notes??0)}{row('Saved app records',info.kv??0)}</div>
<p className="mt-3 text-xs opacity-60">Storage figures are browser estimates. Features that need a camera, microphone or sensor still ask for permission and may not work on every device.</p></div>}
export function Privacy(){
const wipe=async()=>{if(!confirm('Delete ALL data stored by EVERYDAY HUB on this device? This cannot be undone. Consider a backup first.'))return;await db.delete();localStorage.clear();try{for(const k of await caches.keys())await caches.delete(k)}catch{}location.hash='';location.reload()}
return<div className="mx-auto max-w-lg space-y-3"><h2 className="text-2xl font-bold">Privacy Center</h2>
<div className="card space-y-2 text-sm"><p><b>What is stored:</b> your notes, tasks, habits, logs, flashcards, expenses and settings, in this browser's IndexedDB and localStorage.</p><p><b>Where it goes:</b> nowhere. The app has no account and no server, and sends no personal data anywhere.</p>
<p><b>Limits:</b> clearing site data, using private browsing or losing the device deletes it. Export a backup regularly.</p><p><b>Permissions:</b> camera, microphone and motion sensors are requested only by the tools that need them, when you use them.</p></div>
<div className="flex gap-2"><button className="btn" onClick={()=>{location.hash='backup'}}>Export / restore backup</button><button className="btn bg-red-400" onClick={wipe}>Delete all data</button></div></div>}
