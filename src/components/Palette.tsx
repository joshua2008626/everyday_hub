import{useMemo,useState}from'react'
import{APPS}from'../registry'
import{quick}from'../apps/Units'
export default function Palette({onClose,go,toggle}:{onClose:()=>void;go:(id:string)=>void;toggle:()=>void}){
const[q,setQ]=useState('');const[i,setI]=useState(0)
const conv=q.match(/^convert\s+(-?[\d.]+)\s*(\S+)\s+to\s+(\S+)$/i);const cv=conv?quick(+conv[1],conv[2],conv[3]):null
const items=useMemo(()=>{const l=q.toLowerCase();const acts=[{k:'status',n:'Offline status center'},{k:'privacy',n:'Privacy center'},{k:'backup',n:'Backup & restore'},{k:'myspace',n:'My Space'},{k:'collections',n:'Smart collections'},{k:'settings',n:'Settings'},{k:'@theme',n:'Toggle light / dark theme'}]
return[...acts.map(a=>({k:a.k,n:a.n,d:'Action'})),...APPS.map(a=>({k:a.id,n:a.name,d:a.desc}))].filter(x=>(x.n+x.d).toLowerCase().includes(l)).slice(0,8)},[q])
const run=(k:string)=>k==='@theme'?(toggle(),onClose()):go(k)
return<div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-24" onClick={onClose}><div className="card w-full max-w-lg" onClick={e=>e.stopPropagation()}>
<input autoFocus className="inp mb-2" placeholder='Search apps, actions, or "convert 5 km to m"' value={q} onChange={e=>{setQ(e.target.value);setI(0)}} onKeyDown={e=>{if(e.key==='Escape')onClose();else if(e.key==='ArrowDown')setI(Math.min(i+1,items.length-1));else if(e.key==='ArrowUp')setI(Math.max(i-1,0));else if(e.key==='Enter'&&items[i])run(items[i].k)}}/>
{conv&&<div className="mb-2 rounded-xl bg-accent/20 p-2 text-center">{cv===null?'Unknown units':`${conv[1]} ${conv[2]} = ${+cv.toPrecision(8)} ${conv[3]}`}</div>}
{items.map((x,k)=><button key={x.k} className={`flex w-full justify-between rounded-lg px-3 py-2 text-left ${k===i?'bg-accent/20':''}`} onClick={()=>run(x.k)}><span>{x.n}</span><span className="text-xs opacity-50">{x.d}</span></button>)}
{!items.length&&!conv&&<p className="p-3 text-center opacity-60">No results.</p>}</div></div>}
