import{useState}from'react'
import{useKV}from'../hooks/useKV'
type Card={id:number;f:string;b:string;box:number;due:number}
type Deck={id:number;name:string;cards:Card[]}
const DAYS=[0,1,3,7,14,30]
export default function Flash(){
const[ds,setDs]=useKV<Deck[]>('flash',[]);const[sel,setSel]=useState<number|null>(null);const[rev,setRev]=useState(false);const[show,setShow]=useState(false);const[n,setN]=useState('');const[f,setF]=useState('');const[b,setB]=useState('')
const deck=ds.find(d=>d.id===sel);const upd=(d:Deck)=>setDs(ds.map(o=>o.id===d.id?d:o))
if(!deck)return<div className="mx-auto max-w-lg space-y-3"><div className="flex gap-2"><input className="inp" placeholder="New deck name" value={n} onChange={e=>setN(e.target.value)}/><button className="btn" onClick={()=>{if(n.trim()){setDs([...ds,{id:Date.now(),name:n.trim(),cards:[]}]);setN('')}}}>Create</button></div>
{!ds.length&&<p className="py-8 text-center opacity-60">Create a deck to start studying.</p>}
{ds.map(d=><div key={d.id} className="card flex cursor-pointer justify-between" onClick={()=>{setSel(d.id);setRev(false)}}><b>{d.name}</b><span className="text-sm opacity-70">{d.cards.length} cards · {d.cards.filter(c=>c.due<=Date.now()).length} due</span></div>)}</div>
const queue=deck.cards.filter(c=>c.due<=Date.now()).sort((a,c)=>a.due-c.due);const cur=queue[0]
const rate=(g:number)=>{upd({...deck,cards:deck.cards.map(c=>c.id!==cur.id?c:g===0?{...c,box:0,due:Date.now()}:{...c,box:Math.min(5,c.box+g),due:Date.now()+DAYS[Math.min(5,c.box+g)]*864e5})});setShow(false)}
return<div className="mx-auto max-w-lg space-y-3"><div className="flex items-center justify-between"><button onClick={()=>setSel(null)}>← Decks</button><b>{deck.name}</b><button className="btn py-1" onClick={()=>setRev(!rev)}>{rev?'Edit cards':`Review (${queue.length})`}</button></div>
{rev?(cur?<div className="card space-y-4 py-8 text-center"><div className="text-2xl">{cur.f}</div>{show&&<div className="text-xl text-accent">{cur.b}</div>}
{!show?<button className="btn" onClick={()=>setShow(true)}>Show answer</button>:<div className="flex justify-center gap-2"><button className="btn" onClick={()=>rate(0)}>Again</button><button className="btn" onClick={()=>rate(1)}>Good</button><button className="btn" onClick={()=>rate(2)}>Easy</button></div>}</div>:<p className="py-8 text-center opacity-70">All caught up. Nothing due right now.</p>)
:<><div className="card space-y-2"><input className="inp" placeholder="Front" value={f} onChange={e=>setF(e.target.value)}/><input className="inp" placeholder="Back" value={b} onChange={e=>setB(e.target.value)}/><button className="btn w-full" onClick={()=>{if(f&&b){upd({...deck,cards:[...deck.cards,{id:Date.now(),f,b,box:0,due:0}]});setF('');setB('')}}}>Add card</button></div>
{deck.cards.map(c=><div key={c.id} className="card flex justify-between text-sm"><span>{c.f} → {c.b}</span><button onClick={()=>upd({...deck,cards:deck.cards.filter(o=>o.id!==c.id)})}>✕</button></div>)}
<button className="text-xs opacity-50" onClick={()=>{setDs(ds.filter(o=>o.id!==deck.id));setSel(null)}}>Delete deck</button></>}</div>}
