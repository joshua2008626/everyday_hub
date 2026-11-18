import{useState}from'react'
const MIS:Record<string,string>={teh:'the',recieve:'receive',definately:'definitely',seperate:'separate',occured:'occurred',wich:'which',adress:'address',untill:'until',beleive:'believe',becuase:'because',tommorow:'tomorrow',thier:'their',freind:'friend',goverment:'government',wierd:'weird',alot:'a lot'}
const AN=/^(uni|use|usu|one|eu|ura)/i
const find=(t:string)=>{const o:{m:string;s:string}[]=[]
for(const m of t.matchAll(/\b([A-Za-z]+)\b/g)){const f=MIS[m[1].toLowerCase()];if(f)o.push({m:`Possible misspelling: “${m[1]}” → “${f}”`,s:m[1]})}
for(const m of t.matchAll(/\b(\w+)\s+\1\b/gi))o.push({m:`Repeated word: “${m[1]}”`,s:m[0]})
if(/ {2,}/.test(t))o.push({m:'Extra spaces between words',s:''})
for(const m of t.matchAll(/(^|\s)i(\s|')/g))o.push({m:'“i” should be capital “I”',s:m[0].trim()})
for(const m of t.matchAll(/(^|[.!?]\s+)([a-z])(\w*)/g))o.push({m:'Sentence should start with a capital letter',s:m[2]+m[3]})
for(const m of t.matchAll(/\ba\s+([aeiou]\w*)/gi))if(!AN.test(m[1]))o.push({m:'Use “an” before a vowel sound',s:m[0]})
for(const m of t.matchAll(/\ban\s+([bcdfgjklmnpqrstvwxz]\w*)/gi))if(!/^(hour|honest|honou?r|heir)/i.test(m[1]))o.push({m:'Use “a” before a consonant sound',s:m[0]})
for(const m of t.matchAll(/\s+[,.!?;:]/g))o.push({m:'Space before punctuation',s:m[0]});for(const m of t.matchAll(/[,;][A-Za-z]/g))o.push({m:'Missing space after punctuation',s:m[0]})
return o}
const fix=(t:string)=>t.replace(/\b([A-Za-z]+)\b/g,w=>MIS[w.toLowerCase()]||w).replace(/\b(\w+)\s+\1\b/gi,'$1').replace(/ {2,}/g,' ').replace(/(^|\s)i(?=\s|')/g,'$1I').replace(/\s+([,.!?;:])/g,'$1').replace(/(^|[.!?]\s+)([a-z])/g,(_,a,b)=>a+b.toUpperCase())
export default function Grammar(){
const[t,setT]=useState('');const r=find(t)
return<div className="mx-auto max-w-xl space-y-3"><p className="card text-sm">A basic offline checker using simple rules and a short list of common misspellings. It will miss many errors and can flag correct text. It is not a replacement for advanced online grammar services.</p>
<textarea className="inp h-44" placeholder="Paste or type text" value={t} onChange={e=>setT(e.target.value)}/>
<div className="flex items-center gap-3"><button className="btn" disabled={!r.length} onClick={()=>setT(fix(t))}>Apply simple fixes</button><span className="text-sm opacity-70">{t?`${r.length} possible issue${r.length===1?'':'s'}`:''}</span></div>
{r.map((x,i)=><div key={i} className="card text-sm">{x.m}{x.s&&<span className="ml-2 opacity-60">“{x.s}”</span>}</div>)}</div>}
