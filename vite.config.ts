import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({plugins:[react(),VitePWA({registerType:'prompt',manifest:{name:'EVERYDAY HUB',short_name:'Hub',theme_color:'#0b1220',background_color:'#0b1220',display:'standalone',icons:[{src:'icons/192.png',sizes:'192x192',type:'image/png'},{src:'icons/512.png',sizes:'512x512',type:'image/png'}]},workbox:{globPatterns:['**/*.{js,css,html,svg,png,json}'],navigateFallback:'/index.html'}})]})
