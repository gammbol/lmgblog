import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Posts from "@/views/Posts.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: Abo
  // }
  // Добавьте позже:
  // { path: '/posts', name: 'Posts', component: () => import('@/views/Posts.vue') },
  // { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router