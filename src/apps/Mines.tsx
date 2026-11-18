import{useState}from'react'
const N=9,M=10
type C={m:boolean;r:boolean;f:boolean;n:number}
const nb=(i:number)=>{const x=i%N,y=Math.floor(i/N),o:number[]=[];for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){const a=x+dx,b=y+dy;if((dx||dy)&&a>=0&&a<N&&b>=0&&b<N)o.push(b*N+a)}return o}
const blank=():C[]=>Array.from({length:N*N},()=>({m:false,r:false,f:false,n:0}))
export default function Mines(){
const[g,setG]=useState<C[]|null>(null);const[flag,setFlag]=useState(false);const[over,setOver]=useState(0)
const cells=g||blank()
const click=(i:number)=>{if(over)return;let c=cells.map(x=>({...x}));
if(flag){if(!c[i].r)c[i].f=!c[i].f;return setG(c)}
if(c[i].f||c[i].r)return
if(!g){const ban=[i,...nb(i)];let k=0;while(k<M){const p=Math.floor(Math.random()*N*N);if(!c[p].m&&!ban.includes(p)){c[p].m=true;k++}}c.forEach((x,j)=>x.n=nb(j).filter(q=>c[q].m).length)}
if(c[i].m){c.forEach(x=>x.m&&(x.r=true));setG(c);return setOver(-1)}
const st=[i];while(st.length){const p=st.pop()!;if(c[p].r)continue;c[p].r=true;c[p].f=false;if(!c[p].n)nb(p).forEach(q=>!c[q].r&&st.push(q))}
setG(c);if(c.every(x=>x.m||x.r))setOver(1)}
return<div className="mx-auto max-w-xs text-center"><p className="mb-2">{over===1?'You won!':over===-1?'Boom!':`Mines: ${M-cells.filter(c=>c.f).length}`}</p>
<div className="grid grid-cols-9 gap-1">{cells.map((c,i)=><button key={i} className={`aspect-square rounded text-sm font-bold ${c.r?'bg-slate-500/20':'bg-accent/70'}`} onClick={()=>click(i)}>{c.r?(c.m?'💣':c.n||''):c.f?'🚩':''}</button>)}</div>
<div className="mt-4 flex justify-center gap-2"><button className="btn" onClick={()=>setFlag(!flag)}>{flag?'Flag mode: on':'Flag mode: off'}</button><button className="btn" onClick={()=>{setG(null);setOver(0)}}>New</button></div></div>}
