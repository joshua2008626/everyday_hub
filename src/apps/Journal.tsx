import LogApp from'./LogApp'
export default function Journal(){return<LogApp id='journal' fields={[{k:'title',label:'Title'},{k:'tags',label:'Tags (comma separated)'},{k:'text',label:'Write freely',type:'area'}]} show={e=>(e.title?e.title+'\n':'')+(e.tags?'#'+e.tags.split(',').map((t:string)=>t.trim()).filter(Boolean).join(' #')+'\n':'')+(e.text||'')}/>}
