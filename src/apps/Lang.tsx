import{useState}from'react'
import{useKV}from'../hooks/useKV'
const L:Record<string,string>={Spanish:"Hello|Hola;Good morning|Buenos días;Thank you|Gracias;Please|Por favor;Yes|Sí;No|No;Excuse me|Disculpe;How much is it?|¿Cuánto cuesta?;Where is the bathroom?|¿Dónde está el baño?;I don't understand|No entiendo",
French:"Hello|Bonjour;Thank you|Merci;Please|S'il vous plaît;Yes|Oui;No|Non;Excuse me|Excusez-moi;Goodbye|Au revoir;How much is it?|Combien ça coûte ?;Where are the toilets?|Où sont les toilettes ?;I don't understand|Je ne comprends pas",
Hindi:"Hello|नमस्ते (Namaste);Thank you|धन्यवाद (Dhanyavaad);Please|कृपया (Kripya);Yes|हाँ (Haan);No|नहीं (Nahin);Water|पानी (Paani);How much?|कितना? (Kitna?);Goodbye|अलविदा (Alvida);I don't understand|मुझे समझ नहीं आया (Mujhe samajh nahin aaya)",
Tamil:"Hello|வணக்கம் (Vanakkam);Thank you|நன்றி (Nandri);Yes|ஆமாம் (Aamaa);No|இல்லை (Illai);Water|தண்ணீர் (Thanneer);Food|உணவு (Unavu);How are you?|எப்படி இருக்கிறீர்கள்? (Eppadi irukkireergal?);What is your name?|உங்கள் பெயர் என்ன? (Ungal peyar enna?)"}
export default function Lang(){
const[lg,setLg]=useState('Spanish');const[known,setKnown]=useKV<Record<string,number[]>>('lang',{});const[i,setI]=useState(0);const[show,setShow]=useState(false)
const cards=L[lg].split(';').map(s=>s.split('|'));const k=known[lg]||[];const left=cards.map((_,j)=>j).filter(j=>!k.includes(j));const cur=left.includes(i)?i:left[0]
const mark=(ok:boolean)=>{if(ok)setKnown({...known,[lg]:[...k,cur]});else setI(left[(left.indexOf(cur)+1)%left.length]);setShow(false)}
return<div className="mx-auto max-w-sm space-y-3 text-center"><div className="flex flex-wrap justify-center gap-2">{Object.keys(L).map(x=><button key={x} className={`card px-3 py-1 ${lg===x?'ring-2 ring-accent':''}`} onClick={()=>{setLg(x);setI(0);setShow(false)}}>{x}</button>)}</div>
<div className="h-2 overflow-hidden rounded bg-slate-500/20"><div className="h-full bg-accent" style={{width:k.length/cards.length*100+'%'}}/></div><p className="text-sm opacity-70">{k.length}/{cards.length} learned</p>
{cur===undefined?<div className="card py-10">All phrases learned! 🎉<br/><button className="btn mt-3" onClick={()=>setKnown({...known,[lg]:[]})}>Start over</button></div>
:<div className="card space-y-4 py-8"><div className="text-xl">{cards[cur][0]}</div>{show&&<div className="text-2xl text-accent">{cards[cur][1]}</div>}{!show?<button className="btn" onClick={()=>setShow(true)}>Show translation</button>:<div className="flex justify-center gap-2"><button className="btn" onClick={()=>mark(false)}>Again</button><button className="btn" onClick={()=>mark(true)}>Got it</button></div>}</div>}
<p className="text-xs opacity-60">Starter phrases only. Have a native speaker check them before relying on them. Progress is saved on this device.</p></div>}
