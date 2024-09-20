import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MessageList from '../views/MessageList.vue'
import CreateMessage from '../views/CreateMessage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/messages',
    name: 'messages',
    component: MessageList
  },
  {
    path: '/create',
    name: 'create',
    component: CreateMessage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router