import{useState}from'react'
type B=string[][];type M={f:[number,number];t:[number,number]}
const START:B=['rnbqkbnr','pppppppp','........','........','........','........','PPPPPPPP','RNBQKBNR'].map(r=>[...r])
const G:Record<string,string>={K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'}
const V:Record<string,number>={p:100,n:320,b:330,r:500,q:900,k:20000}
const wh=(p:string)=>p!=='.'&&p===p.toUpperCase(),inb=(r:number,c:number)=>r>=0&&r<8&&c>=0&&c<8
const pseudo=(b:B,w:boolean):M[]=>{const ms:M[]=[];for(let r=0;r<8;r++)for(let c=0;c<8;c++){const p=b[r][c];if(p==='.'||wh(p)!==w)continue;const k=p.toLowerCase(),add=(y:number,x:number)=>ms.push({f:[r,c],t:[y,x]})
if(k==='p'){const d=w?-1:1,s=w?6:1;if(inb(r+d,c)&&b[r+d][c]==='.'){add(r+d,c);if(r===s&&b[r+2*d][c]==='.')add(r+2*d,c)}for(const dc of[-1,1])if(inb(r+d,c+dc)&&b[r+d][c+dc]!=='.'&&wh(b[r+d][c+dc])!==w)add(r+d,c+dc)}
else if(k==='n'||k==='k'){const D=k==='n'?[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];for(const[a,d]of D){const y=r+a,x=c+d;if(inb(y,x)&&(b[y][x]==='.'||wh(b[y][x])!==w))add(y,x)}}
else{const D=[...(k!=='b'?[[1,0],[-1,0],[0,1],[0,-1]]:[]),...(k!=='r'?[[1,1],[1,-1],[-1,1],[-1,-1]]:[])];for(const[a,d]of D){let y=r+a,x=c+d;while(inb(y,x)){if(b[y][x]==='.')add(y,x);else{if(wh(b[y][x])!==w)add(y,x);break}y+=a;x+=d}}}}return ms}
const apply=(b:B,m:M):B=>{const n=b.map(r=>[...r]);let p=n[m.f[0]][m.f[1]];if(p==='P'&&m.t[0]===0)p='Q';if(p==='p'&&m.t[0]===7)p='q';n[m.t[0]][m.t[1]]=p;n[m.f[0]][m.f[1]]='.';return n}
const check=(b:B,w:boolean)=>{let kr=-1,kc=-1;b.forEach((r,i)=>r.forEach((p,j)=>{if(p===(w?'K':'k')){kr=i;kc=j}}));return pseudo(b,!w).some(m=>m.t[0]===kr&&m.t[1]===kc)}
const legal=(b:B,w:boolean)=>pseudo(b,w).filter(m=>!check(apply(b,m),w))
const ev=(b:B)=>{let s=0;b.forEach((r,i)=>r.forEach((p,j)=>{if(p==='.')return;const v=V[p.toLowerCase()]+(8-Math.abs(3.5-i)-Math.abs(3.5-j))*(p.toLowerCase()==='p'||p.toLowerCase()==='n'?4:1);s+=wh(p)?v:-v}));return s}
const srch=(b:B,d:number,w:boolean,al:number,be:number):number=>{if(d===0)return ev(b);const ms=pseudo(b,w).sort((x,y)=>+(b[y.t[0]][y.t[1]]!=='.')-+(b[x.t[0]][x.t[1]]!=='.'));if(!ms.length)return 0
let best=w?-1e9:1e9;for(const m of ms){const t=b[m.t[0]][m.t[1]];if(t==='k')return w?1e6+d:-1e6-d;if(t==='K')return w?-1e6-d:1e6+d;const s=srch(apply(b,m),d-1,!w,al,be);if(w){best=Math.max(best,s);al=Math.max(al,s)}else{best=Math.min(best,s);be=Math.min(be,s)}if(be<=al)break}return best}
const ai=(b:B)=>{let best:M|null=null,bs=1e9;for(const m of legal(b,false)){const s=srch(apply(b,m),2,true,-1e9,1e9)+Math.random()*3;if(s<bs){bs=s;best=m}}return best}
export default function Chess(){
const[b,setB]=useState<B>(START);const[sel,setSel]=useState<[number,number]|null>(null);const[msg,setMsg]=useState('Your move (white)');const[busy,setBusy]=useState(false)
const lm=sel?legal(b,true).filter(m=>m.f[0]===sel[0]&&m.f[1]===sel[1]):[]
const end=(n:B,w:boolean)=>{if(legal(n,w).length)return check(n,w)?(w?'Check!':'Check on the computer'):null;return check(n,w)?(w?'Checkmate. Computer wins.':'Checkmate. You win! 🎉'):'Stalemate. Draw.'}
const tap=(r:number,c:number)=>{if(busy)return;const m=lm.find(x=>x.t[0]===r&&x.t[1]===c);if(m){const n=apply(b,m);setB(n);setSel(null);const e=end(n,false);if(e&&e.startsWith('Check'))setMsg(e);if(e&&!e.startsWith('Check'))return setMsg(e);setBusy(true);setMsg('Computer is thinking…');setTimeout(()=>{const a=ai(n);if(!a){setBusy(false);return}const n2=apply(n,a);setB(n2);setBusy(false);setMsg(end(n2,true)||'Your move (white)')},60)}else if(b[r][c]!=='.'&&wh(b[r][c]))setSel([r,c]);else setSel(null)}
return<div className="mx-auto max-w-sm space-y-3 text-center"><p className="h-6">{msg}</p><div className="grid grid-cols-8 overflow-hidden rounded-xl border-2 border-slate-500">{b.map((row,r)=>row.map((p,c)=>{const dot=lm.some(m=>m.t[0]===r&&m.t[1]===c);return<button key={r+'-'+c} className={`relative flex aspect-square items-center justify-center text-3xl ${(r+c)%2?'bg-emerald-800/70':'bg-amber-100/80'} ${sel&&sel[0]===r&&sel[1]===c?'ring-4 ring-inset ring-accent':''}`} onClick={()=>tap(r,c)}><span className={wh(p)?'text-white [text-shadow:0_0_2px_#000,0_0_2px_#000]':'text-black'}>{G[p]||''}</span>{dot&&<span className="absolute h-3 w-3 rounded-full bg-accent/80"/>}</button>}))}</div>
<button className="btn" onClick={()=>{setB(START);setSel(null);setMsg('Your move (white)');setBusy(false)}}>New game</button><p className="text-xs opacity-60">Simplified rules: no castling or en passant, and pawns always promote to a queen. The computer looks a few moves ahead, so it is a casual opponent.</p></div>}
