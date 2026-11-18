import{useRef,useState}from'react'
export default function Torch(){
const[on,setOn]=useState(false);const[msg,setMsg]=useState('');const[screen,setScreen]=useState(false);const st=useRef<MediaStream|null>(null)
const toggle=async()=>{if(on){st.current?.getTracks().forEach(t=>t.stop());setOn(false);return}
try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});const t=s.getVideoTracks()[0];if(!(t.getCapabilities() as any).torch){s.getTracks().forEach(x=>x.stop());return setMsg('This device or browser cannot control the camera flash. Use the screen light instead.')}
await t.applyConstraints({advanced:[{torch:true} as any]});st.current=s;setOn(true);setMsg('')}catch{setMsg('Camera access was denied or is unavailable. Use the screen light instead.')}}
if(screen)return<div className="fixed inset-0 z-50 flex items-end justify-center bg-white p-6" onClick={()=>setScreen(false)}><span className="text-black/50">Tap to close</span></div>
return<div className="mx-auto max-w-xs space-y-3 text-center"><button className="btn w-full py-6 text-xl" onClick={toggle}>{on?'Turn flashlight off':'Turn flashlight on'}</button><button className="btn w-full" onClick={()=>setScreen(true)}>Screen light (works everywhere)</button>{msg&&<p className="text-sm opacity-70">{msg}</p>}<p className="text-xs opacity-60">Camera torch works mainly on Android Chrome over HTTPS.</p></div>}
