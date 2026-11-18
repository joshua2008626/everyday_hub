import{useMemo,useState}from'react'
const WORDS:[string,string][]=[['RIVER','Flowing body of fresh water'],['OCEAN','Vast body of salt water'],['DESERT','Dry region with little rain'],['FOREST','Land covered with trees'],['ISLAND','Land surrounded by water'],['VALLEY','Low area between hills'],['GLACIER','Slow-moving river of ice'],['VOLCANO','Mountain that can erupt'],['CANYON','Deep gorge cut by a river'],['MOUNTAIN','Very high natural elevation'],['LAGOON','Shallow water by the sea'],['TUNDRA','Cold, treeless plain']]
type W={w:string;c:string;r:number;k:number;d:0|1;n:number}
const sh=<T,>(a:T[])=>[...a].sort(()=>Math.random()-.5)
const gen=()=>{let best:W[]=[];for(let t=0;t<40;t++){const g=new Map<string,string>(),dirs=new Map<string,number>(),pl:W[]=[];const at=(r:number,c:number)=>g.get(r+','+c)
const fits=(w:string,r:number,c:number,d:number)=>{const dr=d,dc=1-d;if(at(r-dr,c-dc)||at(r+dr*w.length,c+dc*w.length))return false;let x=0;for(let i=0;i<w.length;i++){const y=r+dr*i,z=c+dc*i,e=at(y,z);if(e){if(e!==w[i]||(dirs.get(y+','+z)||0)&(1<<d))return false;x++}else if(at(y+dc,z+dr)||at(y-dc,z-dr))return false}return pl.length===0||x>0}
const put=(w:[string,string],r:number,c:number,d:0|1)=>{pl.push({w:w[0],c:w[1],r,k:c,d,n:0});[...w[0]].forEach((ch,i)=>{const y=r+d*i,z=c+(1-d)*i;g.set(y+','+z,ch);dirs.set(y+','+z,(dirs.get(y+','+z)||0)|(1<<d))})}
for(const w of sh(WORDS)){if(!pl.length){put(w,0,0,0);continue}let ok=false;for(const p of sh(pl)){for(let i=0;i<p.w.length&&!ok;i++)for(let j=0;j<w[0].length&&!ok;j++)if(p.w[i]===w[0][j]){const d=(1-p.d) as 0|1,r=p.r+p.d*i-d*j,c=p.k+(1-p.d)*i-(1-d)*j;if(fits(w[0],r,c,d)){put(w,r,c,d);ok=true}}if(ok)break}}
if(pl.length>best.length)best=pl}
const mr=Math.min(...best.map(w=>w.r)),mc=Math.min(...best.map(w=>w.k));best=best.map(w=>({...w,r:w.r-mr,k:w.k-mc}))
const starts=[...new Set(best.map(w=>w.r*100+w.k))].sort((a,b)=>a-b);best.forEach(w=>w.n=starts.indexOf(w.r*100+w.k)+1);return best}
export default function Crossword(){
const[p,setP]=useState(gen);const[a,setA]=useState<Record<string,string>>({});const[chk,setChk]=useState(false)
const sol=useMemo(()=>{const m:Record<string,string>={};p.forEach(w=>[...w.w].forEach((ch,i)=>m[(w.r+w.d*i)+','+(w.k+(1-w.d)*i)]=ch));return m},[p])
const R=Math.max(...p.map(w=>w.r+(w.d?w.w.length:1))),C=Math.max(...p.map(w=>w.k+(w.d?1:w.w.length)));const num:Record<string,number>={};p.forEach(w=>num[w.r+','+w.k]=w.n)
const done=Object.keys(sol).every(k=>a[k]===sol[k])
return<div className="mx-auto max-w-md space-y-3"><div className="overflow-auto"><div className="mx-auto grid w-max gap-0.5" style={{gridTemplateColumns:`repeat(${C},2.2rem)`}}>{Array.from({length:R*C},(_,i)=>{const r=Math.floor(i/C),c=i%C,k=r+','+c;return sol[k]?<div key={k} className="relative"><span className="absolute left-0.5 top-0 text-[9px] opacity-60">{num[k]}</span><input maxLength={1} className={`h-9 w-9 rounded border bg-transparent text-center font-bold uppercase ${chk&&a[k]&&a[k]!==sol[k]?'border-red-500 text-red-500':'border-slate-500'}`} value={a[k]||''} onChange={e=>setA({...a,[k]:e.target.value.toUpperCase()})}/></div>:<div key={k}/>})}</div></div>
{done&&<p className="text-center font-semibold">Solved! 🎉</p>}
<div className="grid grid-cols-2 gap-3 text-sm">{([0,1] as const).map(d=><div key={d}><b>{d?'Down':'Across'}</b>{p.filter(w=>w.d===d).sort((x,y)=>x.n-y.n).map(w=><p key={w.n+w.w}>{w.n}. {w.c} ({w.w.length})</p>)}</div>)}</div>
<div className="flex gap-2"><button className="btn" onClick={()=>setChk(!chk)}>{chk?'Hide check':'Check'}</button><button className="btn" onClick={()=>setA(sol)}>Reveal</button><button className="btn" onClick={()=>{setP(gen());setA({});setChk(false)}}>New puzzle</button></div></div>}
