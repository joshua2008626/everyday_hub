import{useState}from'react'
const L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const win=(b:string[])=>{for(const[a,c,d]of L)if(b[a]&&b[a]===b[c]&&b[a]===b[d])return b[a];return b.every(Boolean)?'draw':''}
const mm=(b:string[],p:string):number=>{const w=win(b);if(w==='O')return 1;if(w==='X')return-1;if(w)return 0;const s=b.map((v,i)=>v?null:mm(b.map((x,j)=>j===i?p:x),p==='O'?'X':'O')).filter(v=>v!==null) as number[];return p==='O'?Math.max(...s):Math.min(...s)}
const ai=(b:string[])=>{let best=-2,m=0;b.forEach((v,i)=>{if(v)return;const s=mm(b.map((x,j)=>j===i?'O':x),'X');if(s>best){best=s;m=i}});return m}
export default function TicTacToe(){
const[b,setB]=useState<string[]>(Array(9).fill(''));const w=win(b)
const play=(i:number)=>{if(b[i]||w)return;let n=b.map((v,j)=>j===i?'X':v);if(!win(n))n[ai(n)]='O';setB(n)}
return<div className="mx-auto max-w-xs text-center"><p className="mb-3 h-6">{w==='draw'?'Draw':w?`${w==='X'?'You win':'Computer wins'}!`:'You are X'}</p>
<div className="grid grid-cols-3 gap-2">{b.map((v,i)=><button key={i} className="card aspect-square text-4xl" onClick={()=>play(i)}>{v}</button>)}</div>
<button className="btn mt-4" onClick={()=>setB(Array(9).fill(''))}>Restart</button></div>}
