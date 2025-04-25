import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'
import MainMenu from './pages/MainMenu.vue'
import Game from './pages/Game.vue'
import Info from './pages/Info.vue'

const routes = [
  { path: '/', component: MainMenu, name: 'Menu' },
  { path: '/game', component: Game, name: 'Game' },
  { path: '/info', component: Info, name: 'Info' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
