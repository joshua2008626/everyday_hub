import{useEffect,useRef,useState}from'react'
import{useMedia}from'../hooks/useMedia'
export default function AudioApp({kind,pod}:{kind:string;pod?:boolean}){
const{items,add,remove,update}=useMedia(kind);const[pl,setPl]=useState('');const[np,setNp]=useState('');const[cur,setCur]=useState(-1);const[rep,setRep]=useState<'off'|'all'|'one'>('off');const[shuf,setShuf]=useState(false);const[rate,setRate]=useState(1);const[url,setUrl]=useState('')
const a=useRef<HTMLAudioElement>(null);const lastSave=useRef(0)
const list=items.filter(i=>!pl||i.album===pl);const lists=[...new Set(items.map(i=>i.album).filter(Boolean))];const t=list[cur]
useEffect(()=>{if(!t){setUrl('');return}const u=URL.createObjectURL(t.blob);setUrl(u);return()=>URL.revokeObjectURL(u)},[t?.id])
const go=(d:number)=>{if(!list.length)return;if(shuf)return setCur(Math.floor(Math.random()*list.length));const n=cur+d;if(n>=list.length){if(rep==='all')setCur(0);else setCur(-1)}else setCur((n+list.length)%list.length)}
return<div className="mx-auto max-w-lg space-y-3"><div className="flex flex-wrap gap-2">{!pod&&<input className="inp flex-1" placeholder="Playlist name for new files (optional)" value={np} onChange={e=>setNp(e.target.value)}/>}
<label className="btn cursor-pointer">Add {pod?'episodes':'songs'}<input hidden type="file" accept="audio/*" multiple onChange={e=>{add(e.target.files,np.trim());e.target.value=''}}/></label></div>
{!pod&&lists.length>0&&<div className="flex flex-wrap gap-2"><button className={`card px-3 py-1 ${!pl?'ring-2 ring-accent':''}`} onClick={()=>{setPl('');setCur(-1)}}>All</button>{lists.map(l=><button key={l} className={`card px-3 py-1 ${pl===l?'ring-2 ring-accent':''}`} onClick={()=>{setPl(l);setCur(-1)}}>{l}</button>)}</div>}
{t&&<div className="card space-y-2"><b className="block truncate">{t.name}</b>
<audio ref={a} key={t.id} src={url} controls autoPlay loop={rep==='one'} className="w-full" onEnded={()=>go(1)} onLoadedMetadata={()=>{if(a.current){a.current.playbackRate=rate;if(pod&&t.extra?.pos)a.current.currentTime=t.extra.pos}}} onTimeUpdate={()=>{if(pod&&a.current&&Date.now()-lastSave.current>5000){lastSave.current=Date.now();update(t.id!,{extra:{...t.extra,pos:a.current.currentTime}})}}}/>
<div className="flex flex-wrap items-center gap-2"><button className="card px-3 py-1" onClick={()=>go(-1)}>⏮</button><button className="card px-3 py-1" onClick={()=>go(1)}>⏭</button>
{!pod&&<><button className={`card px-3 py-1 ${shuf?'ring-2 ring-accent':''}`} onClick={()=>setShuf(!shuf)}>Shuffle</button><button className="card px-3 py-1" onClick={()=>setRep(rep==='off'?'all':rep==='all'?'one':'off')}>Repeat: {rep}</button></>}
{pod&&<><select className="inp w-24" value={rate} onChange={e=>{setRate(+e.target.value);if(a.current)a.current.playbackRate=+e.target.value}}>{[.75,1,1.25,1.5,2].map(r=><option key={r} value={r}>{r}×</option>)}</select><button className="btn py-1" onClick={()=>a.current&&update(t.id!,{extra:{...t.extra,bm:[...(t.extra?.bm||[]),Math.round(a.current.currentTime)]}})}>Bookmark</button></>}</div>
{pod&&(t.extra?.bm||[]).length>0&&<div className="flex flex-wrap gap-2 text-sm">{(t.extra.bm as number[]).map((s,i)=><button key={i} className="card px-2 py-0.5" onClick={()=>{if(a.current)a.current.currentTime=s}}>{Math.floor(s/60)}:{String(s%60).padStart(2,'0')}</button>)}</div>}</div>}
{!list.length&&<p className="py-8 text-center opacity-60">Add audio files from your device. They are saved in this app for offline use.</p>}
{list.map((i,k)=><div key={i.id} className={`card flex items-center justify-between text-sm ${k===cur?'ring-2 ring-accent':''}`}><button className="flex-1 truncate text-left" onClick={()=>setCur(k)}>{i.album&&!pod?`[${i.album}] `:''}{i.name}</button><button onClick={()=>{remove(i.id!);if(k===cur)setCur(-1)}}>✕</button></div>)}
<p className="text-xs opacity-60">Files are copied into this browser's storage and use device space. Not included in JSON backups.</p></div>}
