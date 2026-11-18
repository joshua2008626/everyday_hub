import{useEffect,useState}from'react'
import{db}from'../db'
type E={id:number;site:string;user:string;pass:string}
type Box={salt:string;iv:string;data:string}
const b64=(u:Uint8Array)=>btoa(String.fromCharCode(...u)),unb=(s:string)=>Uint8Array.from(atob(s),c=>c.charCodeAt(0))
const derive=async(pw:string,salt:Uint8Array)=>{const km=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt:salt as BufferSource,iterations:310000,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
const gen=()=>{const c='abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*';const r=crypto.getRandomValues(new Uint32Array(16));return Array.from(r,x=>c[x%c.length]).join('')}
export default function Vault(){
const[box,setBox]=useState<Box|null|undefined>(undefined);const[key,setKey]=useState<CryptoKey|null>(null);const[es,setEs]=useState<E[]>([]);const[pw,setPw]=useState('');const[pw2,setPw2]=useState('');const[err,setErr]=useState('');const[f,setF]=useState({site:'',user:'',pass:''});const[show,setShow]=useState<number|null>(null)
useEffect(()=>{db.kv.get('vault').then(r=>setBox(r?.value??null))},[])
const seal=async(k:CryptoKey,list:E[],salt:string)=>{const iv=crypto.getRandomValues(new Uint8Array(12));const ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv:iv as BufferSource},k,new TextEncoder().encode(JSON.stringify(list))));const b={salt,iv:b64(iv),data:b64(ct)};await db.kv.put({key:'vault',value:b});setBox(b)}
const create=async()=>{if(pw.length<8)return setErr('Use at least 8 characters.');if(pw!==pw2)return setErr('Passwords do not match.');const salt=crypto.getRandomValues(new Uint8Array(16));const k=await derive(pw,salt);await seal(k,[],b64(salt));setKey(k);setEs([]);setPw('');setPw2('');setErr('')}
const unlock=async()=>{try{const k=await derive(pw,unb(box!.salt));const p=await crypto.subtle.decrypt({name:'AES-GCM',iv:unb(box!.iv) as BufferSource},k,unb(box!.data) as BufferSource);setEs(JSON.parse(new TextDecoder().decode(p)));setKey(k);setPw('');setErr('')}catch{setErr('Wrong master password.')}}
const save=(l:E[])=>{setEs(l);seal(key!,l,box!.salt)}
if(box===undefined)return<p>Loading…</p>
if(!key)return<div className="mx-auto max-w-sm space-y-3"><div className="card text-sm"><b>Read this first.</b> Your master password cannot be recovered. If you forget it, the vault cannot be opened. Data is encrypted on this device only, and clearing browser data deletes it. Keep backups and do not rely on this as your only copy.</div>
<input className="inp" type="password" placeholder="Master password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&box&&unlock()}/>{!box&&<input className="inp" type="password" placeholder="Confirm master password" value={pw2} onChange={e=>setPw2(e.target.value)}/>}
<button className="btn w-full" onClick={box?unlock:create}>{box?'Unlock':'Create vault'}</button>{err&&<p className="text-sm text-red-400">{err}</p>}</div>
return<div className="mx-auto max-w-lg space-y-3"><div className="flex justify-between"><b>{es.length} saved</b><button className="btn py-1" onClick={()=>{setKey(null);setEs([])}}>Lock</button></div>
<div className="card space-y-2"><input className="inp" placeholder="Site or app" value={f.site} onChange={e=>setF({...f,site:e.target.value})}/><input className="inp" placeholder="Username" value={f.user} onChange={e=>setF({...f,user:e.target.value})}/><div className="flex gap-2"><input className="inp" placeholder="Password" value={f.pass} onChange={e=>setF({...f,pass:e.target.value})}/><button className="btn" onClick={()=>setF({...f,pass:gen()})}>Generate</button></div>
<button className="btn w-full" onClick={()=>{if(f.site&&f.pass){save([...es,{id:Date.now(),...f}]);setF({site:'',user:'',pass:''})}}}>Save entry</button></div>
{es.map(e=><div key={e.id} className="card flex items-center justify-between text-sm"><div><b>{e.site}</b><div className="opacity-70">{e.user}</div><div className="font-mono">{show===e.id?e.pass:'••••••••'}</div></div><div className="flex flex-col gap-1"><button onClick={()=>setShow(show===e.id?null:e.id)}>{show===e.id?'Hide':'Show'}</button><button onClick={()=>navigator.clipboard?.writeText(e.pass)}>Copy</button><button onClick={()=>save(es.filter(o=>o.id!==e.id))}>Delete</button></div></div>)}</div>}
