import{useEffect,useState}from'react'
export default function Level(){
const[a,setA]=useState<{b:number;g:number}|null>(null);const[msg,setMsg]=useState('')
const on=(e:DeviceOrientationEvent)=>{if(e.beta!=null&&e.gamma!=null)setA({b:e.beta,g:e.gamma})}
const start=async()=>{try{const D:any=DeviceOrientationEvent;if(typeof D?.requestPermission==='function'&&(await D.requestPermission())!=='granted')return setMsg('Permission denied.');addEventListener('deviceorientation',on);setMsg('Lay the device flat on the surface.')}catch{setMsg('Motion sensor not supported on this device.')}}
useEffect(()=>()=>removeEventListener('deviceorientation',on),[])
const c=(n:number)=>Math.max(-45,Math.min(45,n));const lvl=a&&Math.abs(a.b)<1&&Math.abs(a.g)<1
return<div className="mx-auto max-w-xs space-y-3 text-center"><div className="relative mx-auto h-56 w-56 rounded-full border-4 border-accent"><div className="absolute left-1/2 top-1/2 h-8 w-8 rounded-full transition-all" style={{background:lvl?'#22c55e':'#6ea8fe',transform:`translate(calc(-50% + ${a?c(a.g)*2.2:0}px),calc(-50% + ${a?c(a.b)*2.2:0}px))`}}/></div>
<p className="text-xl">{a?`X ${a.g.toFixed(1)}° · Y ${a.b.toFixed(1)}°`:'No sensor data'}{lvl&&' · Level!'}</p><button className="btn" onClick={start}>Enable motion sensor</button>{msg&&<p className="text-sm opacity-70">{msg}</p>}<p className="text-xs opacity-60">Needs HTTPS and a device with a tilt sensor. Not a precision tool.</p></div>}
