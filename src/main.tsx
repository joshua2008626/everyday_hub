import{createRoot}from'react-dom/client'
import{registerSW}from'virtual:pwa-register'
import App from'./App'
import'./index.css'
const upd=registerSW({onNeedRefresh(){dispatchEvent(new Event('hub-update'))},onOfflineReady(){localStorage.setItem('offlineReady',String(Date.now()))}})
;(window as any).__hubUpdate=()=>upd(true)
createRoot(document.getElementById('root')!).render(<App/>)
