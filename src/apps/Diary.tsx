import LogApp from'./LogApp'
export default function Diary(){return<LogApp id='diary' fields={[{k:'mood',label:'Mood',type:'select',opts:['😊 Happy','😌 Calm','😐 Okay','😔 Sad','😠 Stressed']},{k:'text',label:'Write about your day',type:'area'}]} show={e=>e.mood+'\n'+(e.text||'')}/>}
