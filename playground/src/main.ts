import '@unocss/reset/tailwind.css'
import 'uno.css'
import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import 'vue-easy-mapbox/dist/index.css'
import { createRouter, createWebHistory } from 'vue-router/auto'

import App from './App.vue'
import './styles/main.css'

const app = createApp(App)
const router = createRouter({
  extendRoutes: routes => setupLayouts(routes),
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.mount('#app')
