import{useEffect,useRef,useState}from'react'
import{useMedia}from'../hooks/useMedia'
import{useKV}from'../hooks/useKV'
type St=Record<string,{cfi?:string;bm?:string[]}>
export default function Ebook(){
const{items,add,remove}=useMedia('ebook');const[st,setSt]=useKV<St>('ebook-state',{});const[id,setId]=useState<number|null>(null);const[pct,setPct]=useState(0);const[err,setErr]=useState('');const box=useRef<HTMLDivElement>(null);const rend=useRef<any>(null);const stR=useRef(st);stR.current=st
const it=items.find(i=>i.id===id)
useEffect(()=>{if(!it||!box.current)return;let book:any;setErr('');(async()=>{try{const ePub=(await import('epubjs')).default;book=ePub(await it.blob.arrayBuffer());const r=book.renderTo(box.current!,{width:'100%',height:'100%',flow:'paginated'});rend.current=r
r.on('relocated',(l:any)=>{const k=String(it.id);setSt({...stR.current,[k]:{...stR.current[k],cfi:l.start.cfi}});if(book.locations?.length())setPct(Math.round(book.locations.percentageFromCfi(l.start.cfi)*100))})
await r.display(stR.current[String(it.id)]?.cfi);book.ready.then(()=>book.locations.generate(1000)).then(()=>{})}catch{setErr('Could not open this book. Only DRM-free EPUB files are supported.')}})();return()=>{rend.current=null;book?.destroy()}},[id])
if(!it)return<div className="mx-auto max-w-lg space-y-3"><label className="btn inline-block cursor-pointer">Add EPUB books<input hidden type="file" accept=".epub,application/epub+zip" multiple onChange={e=>{add(e.target.files);e.target.value=''}}/></label>
{!items.length&&<p className="py-8 text-center opacity-60">Add DRM-free EPUB files. They are saved in this app for offline reading.</p>}
{items.map(i=><div key={i.id} className="card flex justify-between text-sm"><button className="flex-1 truncate text-left" onClick={()=>{setId(i.id!);setPct(0)}}>{i.name}</button><button onClick={()=>remove(i.id!)}>✕</button></div>)}</div>
const k=String(it.id),bm=st[k]?.bm||[]
return<div className="space-y-2"><div className="flex flex-wrap items-center gap-2"><button onClick={()=>setId(null)}>← Library</button><span className="flex-1 truncate text-sm">{it.name}</span><span className="text-sm opacity-70">{pct}%</span>
<button className="btn py-1" onClick={()=>{const c=st[k]?.cfi;if(c&&!bm.includes(c))setSt({...st,[k]:{...st[k],bm:[...bm,c]}})}}>Bookmark</button></div>{err&&<p className="text-sm text-red-400">{err}</p>}
<div className="flex items-center gap-2"><button className="card px-4 py-8" onClick={()=>rend.current?.prev()}>‹</button><div ref={box} className="h-[65vh] flex-1 overflow-hidden rounded-xl bg-white text-black"/><button className="card px-4 py-8" onClick={()=>rend.current?.next()}>›</button></div>
{bm.length>0&&<div className="flex flex-wrap gap-2 text-sm">{bm.map((c,i)=><button key={c} className="card px-2 py-1" onClick={()=>rend.current?.display(c)}>Bookmark {i+1}</button>)}</div>}</div>}
