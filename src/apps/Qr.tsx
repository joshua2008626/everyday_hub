import{useEffect,useRef,useState}from'react'
export default function Qr(){
const[tab,setTab]=useState<'make'|'scan'>('make');const[t,setT]=useState('https://example.com');const[img,setImg]=useState('');const[res,setRes]=useState('');const[err,setErr]=useState('');const v=useRef<HTMLVideoElement>(null);const stop=useRef(false)
useEffect(()=>{if(tab!=='make'||!t){setImg('');return}import('qrcode').then(Q=>Q.toDataURL(t,{width:320,margin:2})).then(setImg).catch(()=>setErr('Could not generate code'))},[t,tab])
useEffect(()=>{if(tab!=='scan')return;stop.current=false;let s:MediaStream|null=null
;(async()=>{const BD=(window as any).BarcodeDetector;if(!BD)return setErr('Scanning is not supported in this browser. Try Chrome on Android.');try{s=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});v.current!.srcObject=s;await v.current!.play();const d=new BD({formats:['qr_code']})
const loop=async()=>{if(stop.current)return;try{const r=await d.detect(v.current!);if(r[0]){setRes(r[0].rawValue);return}}catch{}requestAnimationFrame(loop)};loop()}catch{setErr('Camera access was denied or is unavailable.')}})()
return()=>{stop.current=true;s?.getTracks().forEach(x=>x.stop())}},[tab])
return<div className="mx-auto max-w-sm space-y-3"><div className="flex gap-2">{(['make','scan'] as const).map(x=><button key={x} className={`card flex-1 ${tab===x?'ring-2 ring-accent':''}`} onClick={()=>{setTab(x);setErr('');setRes('')}}>{x==='make'?'Generate':'Scan'}</button>)}</div>
{tab==='make'?<><textarea className="inp" value={t} onChange={e=>setT(e.target.value)}/>{img&&<><img className="mx-auto rounded-xl bg-white" src={img} alt="QR code"/><a className="btn block text-center" href={img} download="qr-code.png">Download PNG</a></>}</>
:<><video ref={v} className="w-full rounded-xl bg-black" playsInline muted/>{res&&<div className="card break-all">{res}<button className="btn ml-2" onClick={()=>navigator.clipboard?.writeText(res)}>Copy</button></div>}</>}{err&&<p className="text-sm text-red-400">{err}</p>}</div>}
