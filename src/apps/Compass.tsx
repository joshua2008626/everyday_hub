import{useEffect,useState}from'react'
const dir=(h:number)=>['N','NE','E','SE','S','SW','W','NW'][Math.round(h/45)%8]
export default function Compass(){
const[h,setH]=useState<number|null>(null);const[msg,setMsg]=useState('');const[man,setMan]=useState(0)
const on=(e:any)=>{const v=e.webkitCompassHeading??(e.absolute&&e.alpha!=null?360-e.alpha:null);if(v!=null)setH(Math.round(v))}
const start=async()=>{try{const D:any=DeviceOrientationEvent;if(typeof D?.requestPermission==='function'&&(await D.requestPermission())!=='granted'){setMsg('Permission denied. Use the manual dial below.');return}
addEventListener('deviceorientationabsolute',on as any,true);addEventListener('deviceorientation',on as any,true);setMsg('Waiting for sensor data… if nothing appears, your device may not have a compass.')}catch{setMsg('Compass sensor not supported here. Use the manual dial.')}}
useEffect(()=>()=>{removeEventListener('deviceorientationabsolute',on as any,true);removeEventListener('deviceorientation',on as any,true)},[])
const v=h??man
return<div className="mx-auto max-w-xs space-y-3 text-center"><div className="relative mx-auto h-56 w-56 rounded-full border-4 border-accent"><span className="absolute left-1/2 top-1 -translate-x-1/2 font-bold">N</span><div className="absolute inset-0 transition-transform" style={{transform:`rotate(${v}deg)`}}><div className="mx-auto mt-6 h-24 w-1 rounded bg-red-500"/></div></div>
<div className="text-3xl">{v}° {dir(v)}</div><button className="btn" onClick={start}>Enable compass sensor</button>{msg&&<p className="text-sm opacity-70">{msg}</p>}
{h===null&&<label className="block text-sm">Manual dial<input type="range" min={0} max={359} className="w-full" value={man} onChange={e=>setMan(+e.target.value)}/></label>}<p className="text-xs opacity-60">Needs HTTPS. Accuracy varies by device and nearby metal or magnets.</p></div>}
