import LogApp from'./LogApp'
import{db}from'../db'
const addToList=async(dish:string)=>{const r=await db.kv.get('shopping');const l=r?.value||[];await db.kv.put({key:'shopping',value:[...l,{id:Date.now(),t:dish,q:'1',c:'Other',done:false}]});alert(`Added "${dish}" to your Shopping List`)}
export default function Meals(){return<LogApp id='meals' dated={false} fields={[{k:'day',label:'Day',type:'select',opts:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']},{k:'meal',label:'Meal',type:'select',opts:['Breakfast','Lunch','Dinner','Snack']},{k:'dish',label:'Dish'}]} show={e=>e.day+' · '+e.meal+': '+e.dish} extra={e=>e.dish?<button className="mt-1 text-xs underline" onClick={()=>addToList(e.dish)}>+ Add to Shopping List</button>:null}/>}
