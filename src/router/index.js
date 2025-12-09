import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Posts from '@/views/Posts.vue'
import PostDetail from '@/views/PostDetail.vue'
import About from '@/views/About.vue'
import Admin from '@/views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Главная | GameBoy DevBlog' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Вход | GameBoy DevBlog',
      requiresGuest: true
    }
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    meta: { title: 'Все посты | GameBoy DevBlog' }
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail,
    meta: { title: 'Пост | GameBoy DevBlog' },
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'Обо мне | GameBoy DevBlog' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Админ-панель | GameBoy DevBlog',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Защита маршрутов (заглушка)
router.beforeEach((to, from, next) => {
  // Устанавливаем заголовок страницы
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Проверка аутентификации (заглушка)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  // Если требуется авторизация
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  // Если требуется админ
  if (to.meta.requiresAdmin && (!isAuthenticated || !isAdmin)) {
    alert('Требуются права администратора!')
    next('/')
    return
  }

  // Если требуется быть гостем (например, на странице логина)
  if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
    return
  }

  next()
})

export default router