import{useEffect,useState}from'react'
import{useKV}from'../hooks/useKV'
type B=number[][];let gained=0
const spawn=(b:B)=>{const e:[number,number][]=[];b.forEach((r,i)=>r.forEach((v,j)=>!v&&e.push([i,j])));if(!e.length)return b;const[i,j]=e[Math.floor(Math.random()*e.length)];const n=b.map(r=>[...r]);n[i][j]=Math.random()<.9?2:4;return n}
const left=(r:number[])=>{const a=r.filter(Boolean);for(let i=0;i<a.length-1;i++)if(a[i]===a[i+1]){a[i]*=2;gained+=a[i];a.splice(i+1,1)}while(a.length<4)a.push(0);return a}
const T=(b:B)=>b[0].map((_,j)=>b.map(r=>r[j])),R=(b:B)=>b.map(r=>[...r].reverse())
const move=(b:B,d:string)=>d==='L'?b.map(left):d==='R'?R(R(b).map(left)):d==='U'?T(T(b).map(left)):T(R(R(T(b)).map(left)))
const fresh=()=>spawn(spawn(Array.from({length:4},()=>Array(4).fill(0))))
const dead=(b:B)=>'LRUD'.split('').every(d=>JSON.stringify(move(b,d))===JSON.stringify(b))
export default function Game2048(){
const[b,setB]=useState<B>(fresh);const[sc,setSc]=useState(0);const[best,setBest]=useKV('2048-best',0)
const go=(d:string)=>{gained=0;const n=move(b,d);if(JSON.stringify(n)===JSON.stringify(b))return;const s=sc+gained;setSc(s);if(s>best)setBest(s);setB(spawn(n))}
useEffect(()=>{const k=(e:KeyboardEvent)=>{const d={ArrowLeft:'L',ArrowRight:'R',ArrowUp:'U',ArrowDown:'D'}[e.key];if(d){e.preventDefault();go(d)}};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)})
let sx=0,sy=0
return<div className="mx-auto max-w-xs touch-none" onTouchStart={e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY}} onTouchEnd={e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))>30)go(Math.abs(dx)>Math.abs(dy)?dx>0?'R':'L':dy>0?'D':'U')}}>
<div className="mb-2 flex justify-between"><span>Score {sc} · Best {best}</span><button className="btn py-1" onClick={()=>{setB(fresh());setSc(0)}}>New</button></div>
<div className="grid grid-cols-4 gap-2 rounded-2xl bg-slate-500/20 p-2">{b.flat().map((v,i)=><div key={i} className="flex aspect-square items-center justify-center rounded-xl text-xl font-bold" style={{background:v?`hsl(${215-Math.log2(v)*14} 70% ${70-Math.log2(v)*3}%)`:'transparent',color:'#0b1220'}}>{v||''}</div>)}</div>
{dead(b)&&<p className="mt-3 text-center font-semibold">No moves left!</p>}<p className="mt-2 text-center text-xs opacity-60">Arrow keys or swipe</p></div>}
