import{useEffect,useRef,useState}from'react'
const F:Record<string,string>={CODE128:'Code 128 (any text)',CODE39:'Code 39',EAN13:'EAN-13 (12–13 digits)',UPC:'UPC-A (11–12 digits)',ITF14:'ITF-14 (13–14 digits)'}
export default function Barcode(){
const[v,setV]=useState('HELLO-123');const[fmt,setFmt]=useState('CODE128');const[err,setErr]=useState('');const cv=useRef<HTMLCanvasElement>(null)
useEffect(()=>{import('jsbarcode').then(m=>{try{(m.default as any)(cv.current,v,{format:fmt,displayValue:true,background:'#fff',margin:12});setErr('')}catch{setErr('That value is not valid for this format.')}})},[v,fmt])
return<div className="mx-auto max-w-sm space-y-3"><select className="inp" value={fmt} onChange={e=>setFmt(e.target.value)}>{Object.entries(F).map(([k,l])=><option key={k} value={k}>{l}</option>)}</select><input className="inp" value={v} onChange={e=>setV(e.target.value)}/>
{err&&<p className="text-sm text-red-400">{err}</p>}<div className="overflow-auto rounded-xl bg-white p-2"><canvas ref={cv} className="mx-auto"/></div><button className="btn w-full" disabled={!!err} onClick={()=>{const a=document.createElement('a');a.href=cv.current!.toDataURL('image/png');a.download='barcode.png';a.click()}}>Download PNG</button></div>}
