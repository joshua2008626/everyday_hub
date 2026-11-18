import{useEffect,useState}from'react'
export default function Tts(){
const ok='speechSynthesis' in window;const[t,setT]=useState('');const[vs,setVs]=useState<SpeechSynthesisVoice[]>([]);const[vi,setVi]=useState(0);const[rate,setRate]=useState(1)
useEffect(()=>{if(!ok)return;const f=()=>setVs(speechSynthesis.getVoices());f();speechSynthesis.onvoiceschanged=f;return()=>{speechSynthesis.cancel()}},[])
if(!ok)return<p className="card">Text-to-speech is not supported in this browser.</p>
const say=()=>{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);if(vs[vi])u.voice=vs[vi];u.rate=rate;speechSynthesis.speak(u)}
return<div className="mx-auto max-w-lg space-y-3"><textarea className="inp h-40" placeholder="Paste text to read aloud" value={t} onChange={e=>setT(e.target.value)}/>
<select className="inp" value={vi} onChange={e=>setVi(+e.target.value)}>{vs.map((v,i)=><option key={i} value={i}>{v.name} ({v.lang})</option>)}</select>
<label className="block text-sm">Speed {rate.toFixed(1)}×<input className="w-full" type="range" min={.5} max={2} step={.1} value={rate} onChange={e=>setRate(+e.target.value)}/></label>
<div className="flex gap-2"><button className="btn" onClick={say}>Play</button><button className="btn" onClick={()=>speechSynthesis.pause()}>Pause</button><button className="btn" onClick={()=>speechSynthesis.resume()}>Resume</button><button className="btn" onClick={()=>speechSynthesis.cancel()}>Stop</button></div><p className="text-xs opacity-60">Voices come from your device. Some voices need to be installed for offline use.</p></div>}
