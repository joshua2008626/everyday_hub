import{useState}from'react'
const diff=(a:string[],b:string[])=>{const n=a.length,m=b.length,L=Array.from({length:n+1},()=>Array(m+1).fill(0));for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)L[i][j]=a[i]===b[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);const o:[string,string][]=[];let i=0,j=0;while(i<n&&j<m){if(a[i]===b[j]){o.push([' ',a[i]]);i++;j++}else if(L[i+1][j]>=L[i][j+1])o.push(['-',a[i++]]);else o.push(['+',b[j++]])}while(i<n)o.push(['-',a[i++]]);while(j<m)o.push(['+',b[j++]]);return o}
export default function TextUtils(){
const[t,setT]=useState('');const[t2,setT2]=useState('');const[cmp,setCmp]=useState(false)
const words=t.trim()?t.trim().split(/\s+/).length:0
const title=(s:string)=>s.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())
const ops:[string,(s:string)=>string][]=[['UPPER',s=>s.toUpperCase()],['lower',s=>s.toLowerCase()],['Title Case',title],['Remove duplicate lines',s=>[...new Set(s.split('\n'))].join('\n')],['Sort lines',s=>s.split('\n').sort().join('\n')],['Trim spaces',s=>s.split('\n').map(x=>x.trim()).join('\n')]]
const a=t.split('\n'),b=t2.split('\n'),big=a.length>2000||b.length>2000,d=cmp&&!big?diff(a,b):[]
return<div className="space-y-3"><textarea className="inp h-56" placeholder="Paste or type text" value={t} onChange={e=>setT(e.target.value)}/>
<p className="text-sm opacity-70">{words} words · {t.length} characters · {t?a.length:0} lines</p>
<div className="flex flex-wrap gap-2">{ops.map(([n,f])=><button key={n} className="btn" onClick={()=>setT(f(t))}>{n}</button>)}<button className={`btn ${cmp?'ring-2 ring-white':''}`} onClick={()=>setCmp(!cmp)}>Compare with another text</button></div>
{cmp&&<div className="space-y-2"><textarea className="inp h-40" placeholder="Second text to compare against" value={t2} onChange={e=>setT2(e.target.value)}/>{big?<p className="text-sm text-red-400">Texts over 2000 lines are too long to compare here.</p>:<div className="card max-h-72 overflow-auto font-mono text-xs"><p className="mb-1 opacity-60">Line comparison: - only in first, + only in second</p>{d.map(([k,l],i)=><div key={i} className={k==='-'?'bg-red-500/20':k==='+'?'bg-green-500/20':'opacity-60'}>{k} {l}</div>)}{!d.length&&<p className="opacity-60">Nothing to compare yet.</p>}</div>}</div>}</div>}
