import{useState}from'react'
import{APPS,COLLECTIONS}from'../registry'
const name=(id:string)=>APPS.find(a=>a.id===id)?.name||id
export function MySpace({fav,setFav,recent,go}:any){
const[add,setAdd]=useState('');const mv=(i:number,d:number)=>{const n=[...fav],j=i+d;if(j<0||j>=n.length)return;[n[i],n[j]]=[n[j],n[i]];setFav(n)}
return<div className="mx-auto max-w-lg space-y-4"><h2 className="text-2xl font-bold">My Space</h2>
<section className="space-y-2"><h3 className="font-semibold">Pinned apps</h3>{!fav.length&&<p className="opacity-60">Pin apps with the star on any card, or add one below.</p>}
{fav.map((id:string,i:number)=><div key={id} className="card flex items-center justify-between"><button className="flex-1 text-left" onClick={()=>go(id)}>{name(id)}</button><span className="flex gap-3"><button disabled={!i} onClick={()=>mv(i,-1)} aria-label="Move up">↑</button><button disabled={i===fav.length-1} onClick={()=>mv(i,1)} aria-label="Move down">↓</button><button onClick={()=>setFav(fav.filter((x:string)=>x!==id))} aria-label="Unpin">✕</button></span></div>)}
<div className="flex gap-2"><select className="inp" value={add} onChange={e=>setAdd(e.target.value)}><option value="">Add an app…</option>{APPS.filter(a=>!fav.includes(a.id)).map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select><button className="btn" onClick={()=>{if(add){setFav([...fav,add]);setAdd('')}}}>Pin</button></div></section>
<section className="space-y-2"><h3 className="font-semibold">Recent activity</h3>{!recent.length&&<p className="opacity-60">Apps you open will appear here.</p>}<div className="flex flex-wrap gap-2">{recent.map((id:string)=>APPS.some(a=>a.id===id)&&<button key={id} className="card px-3 py-1" onClick={()=>go(id)}>{name(id)}</button>)}</div></section>
<button className="btn" onClick={()=>{location.hash='collections'}}>Browse smart collections</button></div>}
export function Collections({go}:any){
return<div className="mx-auto max-w-2xl space-y-3"><h2 className="text-2xl font-bold">Smart Collections</h2><p className="text-sm opacity-70">Groups of the same apps, arranged by purpose. Nothing is duplicated.</p>
{COLLECTIONS.map(c=><section key={c.name} className="card space-y-2"><div><b>{c.name}</b><div className="text-sm opacity-60">{c.desc}</div></div><div className="flex flex-wrap gap-2">{c.ids.map(id=><button key={id} className="rounded-full bg-accent/20 px-3 py-1 text-sm" onClick={()=>go(id)}>{name(id)}</button>)}</div></section>)}</div>}
export function Settings({dark,setDark,setRecent,setFav}:any){
const perms=APPS.filter(a=>a.needs)
return<div className="mx-auto max-w-lg space-y-4"><h2 className="text-2xl font-bold">Settings</h2>
<section className="card space-y-2"><b>Appearance</b><div className="flex gap-2">{[['Dark',true],['Light',false]].map(([l,v])=><button key={String(l)} className={`card flex-1 ${dark===v?'ring-2 ring-accent':''}`} onClick={()=>setDark(v)}>{l}</button>)}</div></section>
<section className="card space-y-2"><b>Personalisation</b><div className="flex flex-wrap gap-2"><button className="btn" onClick={()=>setRecent([])}>Clear recent apps</button><button className="btn" onClick={()=>confirm('Remove all pinned apps?')&&setFav([])}>Clear pinned apps</button></div></section>
<section className="card space-y-1 text-sm"><b>Keyboard shortcuts</b><p><kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd>: open the command palette</p><p><kbd>Esc</kbd>: close the palette</p></section>
<section className="card space-y-1 text-sm"><b>Tools that need permissions or have limits</b>{perms.map(a=><p key={a.id}><b>{a.name}:</b> {a.needs}</p>)}<p className="opacity-60">Camera, microphone and sensors need HTTPS and your permission, and may not exist on every device.</p></section>
<section className="card flex flex-wrap gap-2"><button className="btn" onClick={()=>{location.hash='privacy'}}>Privacy</button><button className="btn" onClick={()=>{location.hash='backup'}}>Backup</button><button className="btn" onClick={()=>{location.hash='status'}}>Offline status</button></section></div>}
