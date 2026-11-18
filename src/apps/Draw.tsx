import{useEffect,useRef,useState}from'react'
export default function Draw(){
const cv=useRef<HTMLCanvasElement>(null);const[col,setCol]=useState('#6ea8fe');const[size,setSize]=useState(6);const[tool,setTool]=useState<'pen'|'marker'|'eraser'>('pen')
const undo=useRef<ImageData[]>([]);const redo=useRef<ImageData[]>([]);const down=useRef(false)
const ctx=()=>cv.current!.getContext('2d')!
useEffect(()=>{const c=ctx();c.fillStyle='#fff';c.fillRect(0,0,800,500)},[])
const pos=(e:React.PointerEvent)=>{const r=cv.current!.getBoundingClientRect();return[(e.clientX-r.left)*800/r.width,(e.clientY-r.top)*500/r.height]}
const snap=()=>ctx().getImageData(0,0,800,500)
const start=(e:React.PointerEvent)=>{undo.current.push(snap());redo.current=[];down.current=true;const c=ctx(),[x,y]=pos(e);c.beginPath();c.moveTo(x,y);move(e)}
const move=(e:React.PointerEvent)=>{if(!down.current)return;const c=ctx(),[x,y]=pos(e);c.lineCap='round';c.lineJoin='round';c.lineWidth=tool==='marker'?size*3:size;c.strokeStyle=tool==='eraser'?'#fff':col;c.globalAlpha=tool==='marker'?.4:1;c.lineTo(x,y);c.stroke();c.globalAlpha=1}
const step=(a:ImageData[],b:ImageData[])=>{const p=a.pop();if(p){b.push(snap());ctx().putImageData(p,0,0)}}
return<div className="space-y-2"><div className="flex flex-wrap items-center gap-2">{(['pen','marker','eraser'] as const).map(t=><button key={t} className={`card px-3 py-1 ${tool===t?'ring-2 ring-accent':''}`} onClick={()=>setTool(t)}>{t}</button>)}
<input type="color" value={col} onChange={e=>setCol(e.target.value)} aria-label="color"/><input type="range" min={1} max={30} value={size} onChange={e=>setSize(+e.target.value)}/>
<button className="card px-3 py-1" onClick={()=>step(undo.current,redo.current)}>Undo</button><button className="card px-3 py-1" onClick={()=>step(redo.current,undo.current)}>Redo</button>
<button className="card px-3 py-1" onClick={()=>{undo.current.push(snap());ctx().fillStyle='#fff';ctx().fillRect(0,0,800,500)}}>Clear</button><button className="btn py-1" onClick={()=>{const a=document.createElement('a');a.href=cv.current!.toDataURL('image/png');a.download='drawing.png';a.click()}}>Export PNG</button></div>
<canvas ref={cv} width={800} height={500} className="w-full touch-none rounded-xl" onPointerDown={start} onPointerMove={move} onPointerUp={()=>down.current=false} onPointerLeave={()=>down.current=false}/></div>}
