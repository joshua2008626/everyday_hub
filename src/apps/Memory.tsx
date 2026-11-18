import{useState}from'react'
const E=['🍎','🚀','🐱','🎸','🌵','🍕','⚽','🔮']
const deal=()=>[...E,...E].map((e,i)=>({e,id:i})).sort(()=>Math.random()-.5)
export default function Memory(){
const[cards,setC]=useState(deal);const[open,setO]=useState<number[]>([]);const[done,setD]=useState<number[]>([]);const[mv,setM]=useState(0)
const flip=(i:number)=>{if(open.length===2||open.includes(i)||done.includes(i))return;const o=[...open,i];setO(o);if(o.length===2){setM(mv+1);if(cards[o[0]].e===cards[o[1]].e){setD([...done,...o]);setO([])}else setTimeout(()=>setO([]),700)}}
return<div className="mx-auto max-w-xs text-center"><p className="mb-3">Moves: {mv}{done.length===16&&' · You won!'}</p>
<div className="grid grid-cols-4 gap-2">{cards.map((c,i)=><button key={c.id} className="card aspect-square text-3xl" onClick={()=>flip(i)}>{open.includes(i)||done.includes(i)?c.e:'?'}</button>)}</div>
<button className="btn mt-4" onClick={()=>{setC(deal());setO([]);setD([]);setM(0)}}>New game</button></div>}
