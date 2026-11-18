import{useLiveQuery}from'dexie-react-hooks'
import{db}from'../db'
export const useMedia=(kind:string)=>{
const items=useLiveQuery(()=>db.media.where('kind').equals(kind).toArray(),[kind])||[]
const add=async(fs:FileList|null,album='')=>{if(fs)await db.media.bulkAdd(Array.from(fs).map(f=>({kind,name:f.name,blob:f as Blob,album,at:Date.now(),extra:{}})))}
return{items,add,remove:(id:number)=>db.media.delete(id),update:(id:number,p:any)=>db.media.update(id,p)}}
