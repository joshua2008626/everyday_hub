import{useKV}from'../hooks/useKV'
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
const inl=(s:string)=>s.replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\*([^*]+)\*/g,'<i>$1</i>').replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a class="underline text-accent" target="_blank" rel="noopener noreferrer" href="$2">$1</a>')
export const md=(src:string)=>{let out='',list='',code=false
const close=()=>{if(list){out+=`</${list}>`;list=''}}
for(const raw of src.split('\n')){if(raw.startsWith('```')){close();out+=code?'</pre>':'<pre class="card overflow-auto text-sm">';code=!code;continue}
if(code){out+=esc(raw)+'\n';continue}const l=esc(raw);let m
if((m=l.match(/^(#{1,6})\s+(.*)/))){close();out+=`<h${m[1].length} class="my-2 font-bold" style="font-size:${2.2-m[1].length*.2}rem">${inl(m[2])}</h${m[1].length}>`}
else if((m=l.match(/^[-*]\s+(.*)/))){if(list!=='ul'){close();out+='<ul class="ml-5 list-disc">';list='ul'}out+=`<li>${inl(m[1])}</li>`}
else if((m=l.match(/^\d+\.\s+(.*)/))){if(list!=='ol'){close();out+='<ol class="ml-5 list-decimal">';list='ol'}out+=`<li>${inl(m[1])}</li>`}
else if((m=l.match(/^&gt;\s?(.*)/))){close();out+=`<blockquote class="border-l-4 border-accent pl-3 opacity-80">${inl(m[1])}</blockquote>`}
else if(l.trim()===''){close()}else{close();out+=`<p class="my-1">${inl(l)}</p>`}}
close();return out}
export default function Markdown(){
const[t,setT]=useKV('markdown','# Hello\n\nWrite **Markdown** here.\n\n- Item one\n- Item two\n')
const dl=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/markdown'}));a.download='document.md';a.click()}
return<div className="space-y-3"><div className="grid gap-3 md:grid-cols-2"><textarea className="inp h-96 font-mono text-sm" value={t} onChange={e=>setT(e.target.value)} spellCheck={false}/><div className="card h-96 overflow-auto" dangerouslySetInnerHTML={{__html:md(t)}}/></div><button className="btn" onClick={dl}>Export .md</button></div>}
