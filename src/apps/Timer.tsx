import{useEffect,useRef,useState}from'react'
export const beep=()=>{try{const c=new AudioContext(),o=c.createOscillator();o.connect(c.destination);o.frequency.value=880;o.start();setTimeout(()=>{o.stop();c.close()},600)}catch{}}
export function Countdown({presets=[1,5,10,25],initial=5,onDone}:{presets?:number[];initial?:number;onDone?:()=>void}){
const[sec,setSec]=useState(initial*60);const[on,setOn]=useState(false);const end=useRef(0)
useEffect(()=>setSec(initial*60),[initial])
useEffect(()=>{if(!on)return;end.current=Date.now()+sec*1000
const i=setInterval(()=>{const r=Math.max(0,Math.round((end.current-Date.now())/1000));setSec(r);if(!r){setOn(false);beep();navigator.vibrate?.(300);onDone?.()}},250);return()=>clearInterval(i)},[on])
const m=String(Math.floor(sec/60)).padStart(2,'0'),s=String(sec%60).padStart(2,'0')
return<div className="mx-auto max-w-xs text-center"><div className="card my-4 text-6xl tabular-nums">{m}:{s}</div>
<div className="mb-3 flex justify-center gap-2">{presets.map(p=><button key={p} className="card px-3 py-1" onClick={()=>{setOn(false);setSec(p*60)}}>{p}m</button>)}</div>
<input className="inp mb-3" type="number" min={1} placeholder="Custom minutes" onChange={e=>{setOn(false);setSec(Math.max(1,+e.target.value||1)*60)}}/>
<button className="btn" onClick={()=>setOn(!on)}>{on?'Pause':'Start'}</button>
<p className="mt-3 text-xs opacity-60">Alerts work while this page is open.</p></div>}
export default function Timer(){return<Countdown/>}
