import{useState}from'react'
const sh=<T,>(a:T[])=>[...a].sort(()=>Math.random()-.5)
const gen=()=>{const g=[0,1,2],rows=sh(g).flatMap(b=>sh(g).map(r=>b*3+r)),cols=sh(g).flatMap(b=>sh(g).map(c=>b*3+c)),n=sh([1,2,3,4,5,6,7,8,9])
const sol=rows.map(r=>cols.map(c=>n[(3*(r%3)+Math.floor(r/3)+c)%9]));const p=sol.map(r=>[...r]);sh(Array.from({length:81},(_,i)=>i)).slice(0,42).forEach(i=>p[Math.floor(i/9)][i%9]=0);return p}
const bad=(g:number[][],r:number,c:number)=>{const v=g[r][c];if(!v)return false;for(let i=0;i<9;i++){if(i!==c&&g[r][i]===v)return true;if(i!==r&&g[i][c]===v)return true}for(let i=0;i<9;i++){const rr=r-r%3+Math.floor(i/3),cc=c-c%3+i%3;if((rr!==r||cc!==c)&&g[rr][cc]===v)return true}return false}
export default function Sudoku(){
const[init,setInit]=useState(gen);const[g,setG]=useState(()=>init.map(r=>[...r]));const[s,setS]=useState<[number,number]|null>(null)
const won=g.every((r,i)=>r.every((v,j)=>v&&!bad(g,i,j)))
const put=(v:number)=>{if(!s||init[s[0]][s[1]])return;setG(g.map((r,i)=>r.map((x,j)=>i===s[0]&&j===s[1]?v:x)))}
const fresh=()=>{const n=gen();setInit(n);setG(n.map(r=>[...r]));setS(null)}
return<div className="mx-auto max-w-sm space-y-3 text-center"><p className="h-6">{won?'Solved! 🎉':'Fill every row, column and box with 1–9'}</p>
<div className="grid grid-cols-9 border-2 border-current">{g.map((r,i)=>r.map((v,j)=><button key={i+'-'+j} className={`aspect-square text-lg ${j%3===2&&j<8?'border-r-2':'border-r'} ${i%3===2&&i<8?'border-b-2':'border-b'} border-slate-500/50 ${s&&s[0]===i&&s[1]===j?'bg-accent/40':''} ${init[i][j]?'font-bold':'text-accent'} ${bad(g,i,j)?'text-red-500':''}`} onClick={()=>setS([i,j])}>{v||''}</button>))}</div>
<div className="grid grid-cols-5 gap-2">{[1,2,3,4,5,6,7,8,9,0].map(n=><button key={n} className="card py-2" onClick={()=>put(n)}>{n||'⌫'}</button>)}</div><button className="btn" onClick={fresh}>New puzzle</button><p className="text-xs opacity-60">Puzzles are random and may have more than one valid solution. Any grid with no conflicts counts as solved.</p></div>}
