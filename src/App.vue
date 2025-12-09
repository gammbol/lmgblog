<template>
  <div class="min-h-screen flex flex-col">
    <!-- Шапка с навигацией -->
    <header class="sticky top-0 z-50 shadow-lg">
      <div class="navbar bg-base-100">
        <div class="container mx-auto flex items-center justify-between">
          <div class="flex-1">
            <!-- Логотип/Название -->
            <router-link to="/" class="btn btn-ghost text-xl">
              🎮 LM GameBoy DevBlog
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
                  О разработчике
                </router-link>
              </li>
              <li v-if="user.isAdmin">
                <router-link
                    to="/admin"
                    class="btn btn-ghost"
                    :class="{ 'btn-active': $route.path === '/admin' }"
                >
                  Админка
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Кнопки управления -->
          <div class="ml-12">
            <!-- Состояние пользователя -->
            <div v-if="isAuthenticated" class="hidden md:flex items-center gap-4">
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full">
                    <img :src="user.avatar" :alt="user.name" />
                  </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <div class="p-3 border-b">
                      <p class="font-semibold">{{ user.name }}</p>
                      <p class="text-xs opacity-70">{{ user.email }}</p>
                    </div>
                  </li>
                  <li><a @click="goToProfile">Мой профиль</a></li>
                  <li v-if="user.isAdmin"><router-link to="/admin">Админ-панель</router-link></li>
                  <li class="divider"></li>
                  <li><a @click="logout" class="text-error">Выйти</a></li>
                </ul>
              </div>
              <div class="hidden lg:block">
                <p class="text-sm font-semibold">{{ user.name }}</p>
                <p class="text-xs opacity-70">{{ user.role }}</p>
              </div>
            </div>

            <!-- Кнопка входа (если не авторизован) -->
            <button
                v-else
                class="btn btn-primary hidden md:inline-flex"
                @click="goToLogin"
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

                <li v-if="isAuthenticated">
                  <div class="p-3 border-t border-b my-2">
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="w-8 rounded-full">
                          <img :src="user.avatar" :alt="user.name" />
                        </div>
                      </div>
                      <div>
                        <p class="font-semibold">{{ user.name }}</p>
                        <p class="text-xs opacity-70">{{ user.email }}</p>
                      </div>
                    </div>
                  </div>
                </li>

                <li v-if="isAuthenticated && user.isAdmin">
                  <router-link to="/admin">Админ-панель</router-link>
                </li>

                <li v-if="!isAuthenticated">
                  <a @click="goToLogin">Войти</a>
                </li>

                <li v-if="isAuthenticated" class="divider"></li>

                <li v-if="isAuthenticated">
                  <a @click="logout" class="text-error">Выйти</a>
                </li>
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
              <span class="text-xl font-bold">LM GameBoy DevBlog</span>
            </div>
            <p>
              Блог о разработке эмулятора GameBoy с нуля. Присоединяйтесь к моему путешествию в мир низкоуровневого программирования!
            </p>
          </div>

          <div>
            <h3 class="footer-title">Навигация</h3>
            <div class="flex items-center justify-start gap-4 mt-2">
              <a class="link link-hover" @click="$router.push('/')">Главная</a>
              <a class="link link-hover" @click="$router.push('/posts')">Все посты</a>
              <a class="link link-hover" @click="$router.push('/about')">О разработчике</a>
              <a v-if="!isAuthenticated" class="link link-hover" @click="goToLogin">Войти в систему</a>
            </div>
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
              <p class="text-sm opacity-70">© 2025 LMGBlog</p>
              <p v-if="isAuthenticated" class="text-xs opacity-50 mt-1">
                Вы вошли как {{ user.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Состояние пользователя
const user = ref({
  isAuthenticated: false,
  name: '',
  email: '',
  avatar: '',
  isAdmin: false,
  role: 'Пользователь'
})

// Вычисляемое свойство для удобства
const isAuthenticated = computed(() => user.value.isAuthenticated)

// Функции
const goToLogin = () => {
  router.push('/login')
}

const goToProfile = () => {
  alert('Страница профиля появится позже!')
}

const logout = () => {
  // Очищаем localStorage
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('isAdmin')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userName')

  // Сбрасываем состояние
  user.value = {
    isAuthenticated: false,
    name: '',
    email: '',
    avatar: '',
    isAdmin: false,
    role: 'Пользователь'
  }

  // Перенаправляем на главную
  router.push('/')
}

// Функция для обновления состояния пользователя
const updateUserState = () => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true'
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  const savedEmail = localStorage.getItem('userEmail') || ''
  const savedName = localStorage.getItem('userName') || ''

  user.value = {
    isAuthenticated: isAuth,
    name: savedName || (isAdmin ? 'Администратор' : 'Пользователь'),
    email: savedEmail || (isAdmin ? 'admin@gameboy.dev' : 'user@example.com'),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${savedEmail || 'user'}`,
    isAdmin: isAdmin,
    role: isAdmin ? 'Администратор' : 'Пользователь'
  }
}

// Слушаем события изменения localStorage (для синхронизации между вкладками)
const handleStorageChange = (event) => {
  if (event.key === 'isAuthenticated' ||
      event.key === 'isAdmin' ||
      event.key === 'userEmail' ||
      event.key === 'userName') {
    updateUserState()
  }
}

// При монтировании компонента
onMounted(() => {
  // Инициализируем состояние
  updateUserState()

  // Добавляем слушатель событий storage
  window.addEventListener('storage', handleStorageChange)
})

// При размонтировании компонента
onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})
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