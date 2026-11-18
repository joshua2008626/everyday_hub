import Dexie,{Table} from 'dexie'
export interface Note{id?:number;title:string;body:string;pinned:boolean;updated:number}
export interface Hist{id?:number;expr:string;result:string;at:number}
class HubDB extends Dexie{notes!:Table<Note>;calcHistory!:Table<Hist>;kv!:Table<{key:string;value:any}>;audio!:Table<{id?:number;at:number;dur:number;type:string;blob:Blob}>;media!:Table<{id?:number;kind:string;name:string;blob:Blob;album:string;at:number;extra:any}>
constructor(){super('everyday-hub');this.version(1).stores({notes:'++id,updated,pinned',calcHistory:'++id,at'});this.version(2).stores({kv:'key'});this.version(3).stores({audio:'++id,at'});this.version(4).stores({media:'++id,kind,album'})}}
export const db=new HubDB()
// Add new tables via this.version(n+1) so user data is never lost on update.
