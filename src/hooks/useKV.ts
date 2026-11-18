import{useEffect,useState}from'react'
import{db}from'../db'
export function useKV<T>(k:string,d:T):[T,(v:T)=>void]{
const[v,s]=useState<T>(d)
useEffect(()=>{db.kv.get(k).then(r=>{if(r)s(r.value)})},[k])
return[v,(n:T)=>{s(n);db.kv.put({key:k,value:n})}]}
