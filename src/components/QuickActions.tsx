import{useState}from'react'
import{Zap,Calculator,StickyNote,Timer,CheckSquare,QrCode}from'lucide-react'
const A=[['calc',Calculator,'Calculator'],['notes',StickyNote,'Notes'],['timer',Timer,'Timer'],['todo',CheckSquare,'To-do'],['qr',QrCode,'QR']] as const
export default function QuickActions({go}:{go:(id:string)=>void}){
const[o,setO]=useState(false)
return<div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">{o&&A.map(([id,I,l])=><button key={id} aria-label={l} title={l} className="card flex items-center gap-2 rounded-full px-4 py-2" onClick={()=>{setO(false);go(id)}}><I size={16}/>{l}</button>)}
<button aria-label="Quick actions" className="rounded-full bg-accent p-3 text-ink shadow-lg" onClick={()=>setO(!o)}><Zap size={20}/></button></div>}
