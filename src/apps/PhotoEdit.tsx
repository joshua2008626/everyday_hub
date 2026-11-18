import{useEffect,useRef,useState}from'react'
const PRE:[string,string][]=[['None',''],['Mono','grayscale(100%)'],['Sepia','sepia(80%)'],['Warm','sepia(30%) saturate(130%)'],['Cool','hue-rotate(20deg) saturate(110%)']]
export default function PhotoEdit(){
const[img,setImg]=useState<HTMLImageElement|null>(null);const[rot,setRot]=useState(0);const[cr,setCr]=useState({l:0,t:0,r:0,b:0});const[br,setBr]=useState(100);const[co,setCo]=useState(100);const[sa,setSa]=useState(100);const[pre,setPre]=useState('');const cv=useRef<HTMLCanvasElement>(null)
const load=(f:File)=>{const i=new Image();i.onload=()=>{setImg(i);setRot(0);setCr({l:0,t:0,r:0,b:0})};i.src=URL.createObjectURL(f)}
useEffect(()=>{if(!img||!cv.current)return;const w=rot%2?img.height:img.width,h=rot%2?img.width:img.height;const o=document.createElement('canvas');o.width=w;o.height=h;const c=o.getContext('2d')!;c.translate(w/2,h/2);c.rotate(rot*Math.PI/2);c.drawImage(img,-img.width/2,-img.height/2)
const sx=w*cr.l/100,sy=h*cr.t/100,sw=w*(1-(cr.l+cr.r)/100),sh=h*(1-(cr.t+cr.b)/100);const k=cv.current;k.width=Math.max(1,Math.round(sw));k.height=Math.max(1,Math.round(sh));const x=k.getContext('2d')!;x.filter=`brightness(${br}%) contrast(${co}%) saturate(${sa}%) ${pre}`;x.drawImage(o,sx,sy,sw,sh,0,0,k.width,k.height)},[img,rot,cr,br,co,sa,pre])
const S=(l:string,v:number,f:(n:number)=>void,min=0,max=200)=><label className="block text-sm">{l} {v}<input className="w-full" type="range" min={min} max={max} value={v} onChange={e=>f(+e.target.value)}/></label>
return<div className="space-y-3"><label className="btn inline-block cursor-pointer">Open photo<input hidden type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&load(e.target.files[0])}/></label>
{!img?<p className="py-10 text-center opacity-60">Open a photo to start editing. Everything stays on your device.</p>:<div className="grid gap-4 md:grid-cols-[1fr_260px]"><canvas ref={cv} className="max-h-[70vh] w-full rounded-xl bg-slate-500/20 object-contain"/>
<div className="space-y-2">{S('Brightness',br,setBr)}{S('Contrast',co,setCo)}{S('Saturation',sa,setSa)}
<div className="flex flex-wrap gap-1">{PRE.map(([n,f])=><button key={n} className={`card px-2 py-1 text-sm ${pre===f?'ring-2 ring-accent':''}`} onClick={()=>setPre(f)}>{n}</button>)}</div>
{(['l','t','r','b'] as const).map(k=>S('Crop '+{l:'left',t:'top',r:'right',b:'bottom'}[k]+' %',cr[k],n=>setCr({...cr,[k]:n}),0,45))}
<div className="flex gap-2"><button className="btn" onClick={()=>setRot((rot+1)%4)}>Rotate</button><button className="btn" onClick={()=>{setBr(100);setCo(100);setSa(100);setPre('');setCr({l:0,t:0,r:0,b:0});setRot(0)}}>Reset</button><button className="btn" onClick={()=>cv.current!.toBlob(b=>{if(!b)return;const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='edited.png';a.click()})}>Export</button></div>
<p className="text-xs opacity-60">Filters may not export in older Safari versions.</p></div></div>}</div>}
