import{useState}from'react'
import{db}from'../db'
const LS=['dark','fav','recent']
export default function Backup(){
const[msg,setMsg]=useState('')
const exp=async()=>{const data={app:'everyday-hub',version:1,exported:new Date().toISOString(),notes:await db.notes.toArray(),calcHistory:await db.calcHistory.toArray(),kv:await db.kv.toArray(),prefs:Object.fromEntries(LS.map(k=>[k,localStorage.getItem(k)]))}
const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download=`everyday-hub-backup-${data.exported.slice(0,10)}.json`;a.click();setMsg('Backup downloaded. Store it somewhere safe.')}
const imp=async(f:File)=>{try{const d=JSON.parse(await f.text())
if(d.app!=='everyday-hub'||d.version!==1||!Array.isArray(d.notes)||!Array.isArray(d.kv)||!Array.isArray(d.calcHistory)||!d.kv.every((r:any)=>r&&typeof r.key==='string'))throw new Error('This is not a valid EVERYDAY HUB backup. Nothing was changed.')
if(!confirm(`Replace ALL current data with this backup (${d.notes.length} notes, ${d.kv.length} app records)?`))return
await db.transaction('rw',db.notes,db.calcHistory,db.kv,async()=>{await db.notes.clear();await db.calcHistory.clear();await db.kv.clear();await db.notes.bulkPut(d.notes);await db.calcHistory.bulkPut(d.calcHistory);await db.kv.bulkPut(d.kv)})
Object.entries(d.prefs||{}).forEach(([k,v])=>LS.includes(k)&&typeof v==='string'&&localStorage.setItem(k,v));setMsg('Restored. Reload the page to see your data.')}catch(e:any){setMsg(e.message||'Import failed. Nothing was changed.')}}
return<div className="mx-auto max-w-md space-y-3"><div className="card space-y-2"><h3 className="font-semibold">Export</h3><p className="text-sm opacity-70">Saves all notes, tasks, habits, expenses, flashcards and settings to one JSON file. Voice recordings, music, podcasts and photos are not included, so keep your original files.</p><button className="btn" onClick={exp}>Download backup</button></div>
<div className="card space-y-2"><h3 className="font-semibold">Restore</h3><p className="text-sm opacity-70">The file is checked first. Restoring replaces everything currently stored.</p><input type="file" accept="application/json" onChange={e=>e.target.files?.[0]&&imp(e.target.files[0])}/></div>
{msg&&<p className="card text-sm">{msg}</p>}
<p className="text-xs opacity-60">Data lives only in this browser. Clearing site data or losing the device deletes it, so keep a backup.</p></div>}
