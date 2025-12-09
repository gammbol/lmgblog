<template>
  <div class="min-h-screen flex flex-col">
    <!-- Шапка с навигацией -->
    <header class="sticky top-0 z-50 shadow-lg">
      <div class="navbar bg-base-100">
        <div class="container mx-auto px-4">
          <div class="flex-1">
            <!-- Логотип/Название -->
            <router-link to="/" class="btn btn-ghost text-xl">
              🎮 GameBoy DevBlog
            </router-link>
          </div>

          <!-- Десктопное меню -->
          <div class="flex-none hidden md:flex">
            <ul class="menu menu-horizontal px-1 gap-2">
              <li>
                <router-link
                    to="/"
                    class="btn btn-ghost"
                    :class="{ 'btn-active': $route.path === '/' }"
                >
                  Главная
                </router-link>
              </li>
              <li>
                <router-link
                    to="/posts"
                    class="btn btn-ghost"
                    :class="{ 'btn-active': $route.path.startsWith('/posts') }"
                >
                  Посты
                </router-link>
              </li>
              <li>
                <router-link
                    to="/about"
                    class="btn btn-ghost"
                    :class="{ 'btn-active': $route.path === '/about' }"
                >
                  Обо мне
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Кнопки управления -->
          <div class="flex-none gap-2">
            <!-- Десктопная кнопка входа -->
            <button
                class="btn btn-primary hidden md:inline-flex"
                @click="handleLogin"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Войти
            </button>

            <!-- Мобильное меню -->
            <div class="dropdown dropdown-end md:hidden">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><router-link to="/">Главная</router-link></li>
                <li><router-link to="/posts">Посты</router-link></li>
                <li><router-link to="/about">Обо мне</router-link></li>
                <li class="divider"></li>
                <li><a @click="handleLogin">Войти</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Основное содержимое -->
    <main class="flex-grow">
      <div class="container mx-auto px-4 py-8">
        <router-view />
      </div>
    </main>

    <!-- Подвал -->
    <footer class="footer bg-base-200 text-base-content p-10">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="text-2xl">🎮</span>
              <span class="text-xl font-bold">GameBoy DevBlog</span>
            </div>
            <p>
              Блог о разработке эмулятора GameBoy с нуля. Присоединяйтесь к моему путешествию в мир низкоуровневого программирования!
            </p>
          </div>

          <div>
            <h3 class="footer-title">Навигация</h3>
            <a class="link link-hover" @click="$router.push('/')">Главная</a>
            <a class="link link-hover" @click="$router.push('/posts')">Все посты</a>
            <a class="link link-hover" @click="$router.push('/about')">О разработчике</a>
            <a class="link link-hover" @click="handleLogin">Войти в систему</a>
          </div>

          <div>
            <h3 class="footer-title">Технологии проекта</h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-outline">Vue 3</span>
              <span class="badge badge-outline">Vite</span>
              <span class="badge badge-outline">Tailwind CSS</span>
              <span class="badge badge-outline">DaisyUI</span>
              <span class="badge badge-outline">C++</span>
              <span class="badge badge-outline">PostgreSQL</span>
            </div>
            <div class="mt-6">
              <p class="text-sm opacity-70">© 2024 GameBoy DevBlog. Все посты написаны с ❤️.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const handleLogin = () => {
  // Временная заглушка - в будущем заменим на реальную авторизацию
  alert('Функция авторизации появится позже! Сейчас вас перенаправит на страницу логина.')
  router.push('/login')
}
</script>

<style scoped>
/* Плавные переходы для кнопок */
.btn {
  transition: all 0.2s ease;
}

/* Активная ссылка в навигации */
.router-link-active {
  @apply font-semibold;
}
</style>