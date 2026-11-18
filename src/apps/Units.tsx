import{useState}from'react'
const T:Record<string,Record<string,number>>={Length:{m:1,km:1000,cm:.01,mm:.001,mi:1609.344,yd:.9144,ft:.3048,in:.0254},Weight:{kg:1,g:.001,mg:1e-6,lb:.45359237,oz:.0283495},Volume:{L:1,mL:.001,gal:3.78541,qt:.946353,cup:.236588,'fl oz':.0295735},Speed:{'m/s':1,'km/h':.277778,mph:.44704,kn:.514444},Area:{'m²':1,'km²':1e6,ha:1e4,acre:4046.86,'ft²':.092903},Time:{s:1,min:60,h:3600,day:86400,week:604800},Temperature:{'°C':1,'°F':1,K:1}}
const temp=(v:number,f:string,t:string)=>{const c=f==='°F'?(v-32)*5/9:f==='K'?v-273.15:v;return t==='°F'?c*9/5+32:t==='K'?c+273.15:c}
export default function Units(){
const[cat,setCat]=useState('Length');const u=Object.keys(T[cat]);const[f,setF]=useState('km');const[t,setT]=useState('m');const[v,setV]=useState(5)
const fix=(c:string)=>{setCat(c);const k=Object.keys(T[c]);setF(k[0]);setT(k[1])}
const out=cat==='Temperature'?temp(v,f,t):v*T[cat][f]/T[cat][t]
return<div className="mx-auto max-w-md space-y-3"><select className="inp" value={cat} onChange={e=>fix(e.target.value)}>{Object.keys(T).map(c=><option key={c}>{c}</option>)}</select>
<input className="inp" type="number" value={v} onChange={e=>setV(+e.target.value)}/>
<div className="flex gap-2"><select className="inp" value={f} onChange={e=>setF(e.target.value)}>{u.map(x=><option key={x}>{x}</option>)}</select><select className="inp" value={t} onChange={e=>setT(e.target.value)}>{u.map(x=><option key={x}>{x}</option>)}</select></div>
<div className="card text-center text-2xl">{+out.toPrecision(8)} {t}</div></div>}
export function quick(v:number,f:string,t:string){for(const c of Object.keys(T)){if(T[c][f]&&T[c][t])return c==='Temperature'?temp(v,f,t):v*T[c][f]/T[c][t]}return null}
