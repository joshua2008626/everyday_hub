import{useState}from'react'
import{Playground}from'./Html'
const X=[{t:'1. Make the heading red and centered',g:'Add CSS so the h1 is red and centered.',s:{h:'<h1>My page</h1>',c:'',j:''}},{t:'2. Count button clicks',g:'Write JS so each click increases the number shown.',s:{h:'<button id="b">Clicks: 0</button>',c:'',j:''}},{t:'3. Build a list from an array',g:'Use JS to add one <li> per item to the list.',s:{h:'<ul id="l"></ul>',c:'',j:"const items=['apple','pear','plum'];"}}]
export default function CodePrac(){
const[i,setI]=useState(0)
return<div className="space-y-3"><div className="flex flex-wrap gap-2">{X.map((x,k)=><button key={k} className={`card px-3 py-1 ${i===k?'ring-2 ring-accent':''}`} onClick={()=>setI(k)}>{x.t}</button>)}</div><p className="card text-sm">{X[i].g} Your code runs in a sandboxed preview on this device only.</p><Playground key={i} k={'code-'+i} init={X[i].s}/></div>}
