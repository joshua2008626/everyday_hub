import{useState}from'react'
type C={s:number;r:number;up:boolean};type G={stock:C[];waste:C[];found:C[][];tab:C[][]};type Sel={k:'w'|'t'|'f';i:number;j:number}|null
const SU=['♠','♥','♦','♣'],RK=['','A','2','3','4','5','6','7','8','9','10','J','Q','K'],red=(c:C)=>c.s===1||c.s===2
const deal=():G=>{const d:C[]=[];for(let s=0;s<4;s++)for(let r=1;r<=13;r++)d.push({s,r,up:false});d.sort(()=>Math.random()-.5);const tab:C[][]=[];for(let i=0;i<7;i++){const col=d.splice(0,i+1);col[i].up=true;tab.push(col)}return{stock:d,waste:[],found:[[],[],[],[]],tab}}
const clone=(g:G):G=>({stock:g.stock.map(c=>({...c})),waste:g.waste.map(c=>({...c})),found:g.found.map(p=>p.map(c=>({...c}))),tab:g.tab.map(p=>p.map(c=>({...c})))})
const Card=({c,sel,onClick}:{c:C;sel?:boolean;onClick:()=>void})=><button onClick={onClick} className={`h-14 w-10 shrink-0 rounded-md border border-slate-400 text-xs font-bold ${c.up?'bg-white '+(red(c)?'text-red-600':'text-black'):'bg-accent/50'} ${sel?'ring-2 ring-accent':''}`}>{c.up?RK[c.r]+SU[c.s]:''}</button>
export default function Solitaire(){
const[g,setG]=useState<G>(deal);const[sel,setSel]=useState<Sel>(null)
const pick=(n:G,s:NonNullable<Sel>)=>s.k==='w'?n.waste.slice(-1):s.k==='f'?n.found[s.i].slice(-1):n.tab[s.i].slice(s.j)
const move=(d:{k:'t'|'f';i:number})=>{if(!sel)return false;const n=clone(g),cs=pick(n,sel);if(!cs.length)return false;const c=cs[0]
if(d.k==='f'){if(cs.length!==1||c.r!==n.found[c.s].length+1)return false}else{if(sel.k==='t'&&sel.i===d.i)return false;const col=n.tab[d.i],top=col[col.length-1];if(top?!(top.up&&red(top)!==red(c)&&top.r===c.r+1):c.r!==13)return false}
if(sel.k==='w')n.waste.pop();else if(sel.k==='f')n.found[sel.i].pop();else{n.tab[sel.i].splice(sel.j);const t=n.tab[sel.i];if(t.length)t[t.length-1].up=true}
if(d.k==='f')n.found[c.s].push(c);else n.tab[d.i].push(...cs);setG(n);setSel(null);return true}
const draw=()=>{const n=clone(g);if(n.stock.length){const c=n.stock.pop()!;c.up=true;n.waste.push(c)}else{n.stock=n.waste.reverse().map(c=>({...c,up:false}));n.waste=[]}setG(n);setSel(null)}
const waste=()=>{if(sel?.k==='w'){if(!move({k:'f',i:0}))setSel(null)}else if(g.waste.length)setSel({k:'w',i:0,j:0})}
const card=(i:number,j:number)=>{const c=g.tab[i][j];if(sel){if(sel.k==='t'&&sel.i===i&&sel.j===j){if(!move({k:'f',i:0}))setSel(null);return}if(move({k:'t',i}))return}if(c.up)setSel({k:'t',i,j})}
const won=g.found.every(p=>p.length===13)
return<div className="mx-auto max-w-sm space-y-3"><p className="h-6 text-center">{won?'You won! 🎉':sel?'Tap a destination. Tap the card again to send it to the foundation.':'Tap a card to select it'}</p>
<div className="flex justify-between"><div className="flex gap-1"><button className="h-14 w-10 rounded-md border border-slate-400 bg-accent/40 text-xs" onClick={draw}>{g.stock.length?g.stock.length:'↺'}</button>{g.waste.length?<Card c={g.waste[g.waste.length-1]} sel={sel?.k==='w'} onClick={waste}/>:<div className="h-14 w-10 rounded-md border border-dashed border-slate-500"/>}</div>
<div className="flex gap-1">{g.found.map((p,k)=>p.length?<Card key={k} c={p[p.length-1]} sel={sel?.k==='f'&&sel.i===k} onClick={()=>sel?move({k:'f',i:k}):setSel({k:'f',i:k,j:0})}/>:<button key={k} className="h-14 w-10 rounded-md border border-dashed border-slate-500 text-xs opacity-50" onClick={()=>sel&&move({k:'f',i:k})}>{SU[k]}</button>)}</div></div>
<div className="flex justify-between">{g.tab.map((col,i)=><div key={i} className="flex min-h-14 w-10 flex-col" onClick={()=>!col.length&&sel&&move({k:'t',i})}>{col.length?col.map((c,j)=><div key={j} className={j?'-mt-10':''}><Card c={c} sel={sel?.k==='t'&&sel.i===i&&j>=sel.j} onClick={()=>card(i,j)}/></div>):<div className="h-14 w-10 rounded-md border border-dashed border-slate-500"/>}</div>)}</div>
<div className="text-center"><button className="btn" onClick={()=>{setG(deal());setSel(null)}}>New game</button></div><p className="text-center text-xs opacity-60">Klondike, draw one card. Build down in alternating colours; foundations go A to K by suit.</p></div>}
