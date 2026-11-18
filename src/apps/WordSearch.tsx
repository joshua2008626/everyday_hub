import{useState}from'react'
const N=10,BANK=['PLANET','BRIDGE','GARDEN','ROCKET','SILVER','WINDOW','CANDLE','FOREST','MARKET','ORANGE','TUNNEL','VIOLET','ANCHOR','BASKET']
const build=()=>{const ws=[...BANK].sort(()=>Math.random()-.5).slice(0,6);const g:string[][]=Array.from({length:N},()=>Array(N).fill(''))
for(const w of ws)for(let t=0;t<200;t++){const[dr,dc]=[[0,1],[1,0],[1,1]][Math.floor(Math.random()*3)],r=Math.floor(Math.random()*N),c=Math.floor(Math.random()*N),er=r+dr*(w.length-1),ec=c+dc*(w.length-1);if(er>=N||ec>=N)continue
if([...w].some((ch,i)=>g[r+dr*i][c+dc*i]&&g[r+dr*i][c+dc*i]!==ch))continue;[...w].forEach((ch,i)=>g[r+dr*i][c+dc*i]=ch);break}
return{ws,g:g.map(r=>r.map(x=>x||String.fromCharCode(65+Math.floor(Math.random()*26))))}}
export default function WordSearch(){
const[p,setP]=useState(build);const[a,setA]=useState<[number,number]|null>(null);const[found,setF]=useState<string[]>([]);const[cells,setC]=useState<Set<string>>(new Set())
const tap=(r:number,c:number)=>{if(!a)return setA([r,c]);const dr=Math.sign(r-a[0]),dc=Math.sign(c-a[1]),len=Math.max(Math.abs(r-a[0]),Math.abs(c-a[1]))+1
if(!(dr===0||dc===0||Math.abs(r-a[0])===Math.abs(c-a[1]))){return setA([r,c])}
const pts=Array.from({length:len},(_,i)=>[a[0]+dr*i,a[1]+dc*i]),s=pts.map(([y,x])=>p.g[y][x]).join('');const w=p.ws.find(x=>x===s||x===[...s].reverse().join(''))
if(w&&!found.includes(w)){setF([...found,w]);setC(new Set([...cells,...pts.map(q=>q.join())]))}setA(null)}
return<div className="mx-auto max-w-sm space-y-3 text-center"><p>{found.length===p.ws.length?'All words found! 🎉':'Tap the first and last letter of a word'}</p>
<div className="grid grid-cols-10 gap-0.5">{p.g.map((r,i)=>r.map((ch,j)=><button key={i+'-'+j} className={`aspect-square rounded text-sm font-bold ${cells.has(i+','+j)?'bg-green-500/50':a&&a[0]===i&&a[1]===j?'bg-accent/60':'card p-0'}`} onClick={()=>tap(i,j)}>{ch}</button>))}</div>
<p className="text-sm">{p.ws.map(w=><span key={w} className={`mr-2 ${found.includes(w)?'line-through opacity-50':''}`}>{w}</span>)}</p><button className="btn" onClick={()=>{setP(build());setF([]);setC(new Set());setA(null)}}>New puzzle</button></div>}
