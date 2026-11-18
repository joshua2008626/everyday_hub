import LogApp from'./LogApp'
const hrs=(b:string,w:string)=>b&&w?((+w.slice(0,2)*60+ +w.slice(3)-(+b.slice(0,2)*60+ +b.slice(3))+1440)%1440)/60:0
export default function Sleep(){return<LogApp id='sleep' fields={[{k:'bed',label:'Went to bed',type:'time'},{k:'wake',label:'Woke up',type:'time'}]} show={e=>hrs(e.bed,e.wake).toFixed(1)+' h ('+e.bed+' to '+e.wake+')'} summary={es=>{const r=es.slice(0,7);return r.length?'Last '+r.length+' nights: avg '+(r.reduce((s,e)=>s+hrs(e.bed,e.wake),0)/r.length).toFixed(1)+' h (manual entries)':'Log your sleep manually'}}/>}
