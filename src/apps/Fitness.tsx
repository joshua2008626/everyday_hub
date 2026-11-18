import LogApp from'./LogApp'
export default function Fitness(){return<LogApp id='fitness' fields={[{k:'act',label:'Activity'},{k:'min',label:'Minutes',type:'number'},{k:'note',label:'Notes',type:'area'}]} show={e=>e.act+' · '+(e.min||0)+' min'+(e.note?'\n'+e.note:'')} summary={es=>es.reduce((s,e)=>s+(+e.min||0),0)+' total minutes logged'}/>}
