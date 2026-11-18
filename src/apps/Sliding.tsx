import{useState}from'react'
const N=3
const nbrs=(z:number)=>[z-N,z+N,z%N?z-1:-1,(z+1)%N?z+1:-1].filter(x=>x>=0&&x<N*N)
const shuffle=()=>{let t=[1,2,3,4,5,6,7,8,0],z=8,prev=-1;for(let k=0;k<120;k++){const o=nbrs(z).filter(x=>x!==prev);const n=o[Math.floor(Math.random()*o.length)];[t[z],t[n]]=[t[n],t[z]];prev=z;z=n}return t}
export default function Sliding(){
const[t,setT]=useState(shuffle);const[m,setM]=useState(0);const z=t.indexOf(0);const solved=t.every((v,i)=>v===(i+1)%9)
const tap=(i:number)=>{if(!nbrs(z).includes(i)||solved)return;const n=[...t];[n[z],n[i]]=[n[i],n[z]];setT(n);setM(m+1)}
return<div className="mx-auto max-w-xs text-center"><p className="mb-3">Moves: {m}{solved&&' · Solved!'}</p>
<div className="grid grid-cols-3 gap-2">{t.map((v,i)=><button key={i} className={`aspect-square rounded-xl text-3xl font-bold ${v?'bg-accent text-ink':'opacity-0'}`} onClick={()=>tap(i)}>{v||''}</button>)}</div>
<button className="btn mt-4" onClick={()=>{setT(shuffle());setM(0)}}>Shuffle</button></div>}
