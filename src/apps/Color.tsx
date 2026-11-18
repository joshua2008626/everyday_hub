import{useState}from'react'
const rgb=(h:string)=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16))
const hsl=([r,g,b]:number[])=>{r/=255;g/=255;b/=255;const M=Math.max(r,g,b),m=Math.min(r,g,b),l=(M+m)/2,d=M-m;let h=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));h=M===r?((g-b)/d)%6:M===g?(b-r)/d+2:(r-g)/d+4;h=(h*60+360)%360}return[Math.round(h),Math.round(s*100),Math.round(l*100)]}
export default function Color(){
const[c,setC]=useState('#6ea8fe');const R=rgb(c);const H=hsl(R)
const rows=[['HEX',c.toUpperCase()],['RGB',`rgb(${R.join(', ')})`],['HSL',`hsl(${H[0]}, ${H[1]}%, ${H[2]}%)`]]
const pal=[-30,-15,0,15,30].map(d=>`hsl(${(H[0]+d+360)%360}, ${H[1]}%, ${H[2]}%)`)
return<div className="mx-auto max-w-sm space-y-3"><input type="color" className="h-24 w-full rounded-xl" value={c} onChange={e=>setC(e.target.value)}/>
{rows.map(([k,v])=><button key={k} className="card flex w-full justify-between" onClick={()=>navigator.clipboard?.writeText(v)}><span>{k}</span><span>{v}</span></button>)}
<div className="flex overflow-hidden rounded-xl">{pal.map(p=><div key={p} className="h-12 flex-1" style={{background:p}}/>)}</div><p className="text-xs opacity-60">Tap a row to copy.</p></div>}
