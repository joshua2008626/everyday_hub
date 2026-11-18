import LogApp from'./LogApp'
export default function Recipes(){return<LogApp id='recipes' dated={false} fields={[{k:'title',label:'Recipe name'},{k:'ing',label:'Ingredients',type:'area'},{k:'steps',label:'Instructions',type:'area'}]} show={e=>e.title+'\n\nIngredients:\n'+(e.ing||'')+'\n\n'+(e.steps||'')}/>}
