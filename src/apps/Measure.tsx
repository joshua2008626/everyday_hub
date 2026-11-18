import LogApp from'./LogApp'
export default function Measure(){return<LogApp id='measure' fields={[{k:'name',label:'What you measured'},{k:'val',label:'Value',type:'number'},{k:'unit',label:'Unit'}]} show={e=>e.name+': '+e.val+' '+(e.unit||'')} summary={()=>'Private. Stored only on this device.'}/>}
