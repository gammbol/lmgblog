<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-2">Вход в систему</h2>
        <p class="text-sm opacity-70 mb-6">
          Требуется для добавления комментариев и управления блогом
        </p>

        <!-- Демо-режим уведомление -->
        <div class="alert alert-info mb-6">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm">Демо-режим: используйте любые данные</span>
        </div>

        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
                type="email"
                placeholder="your@email.com"
                class="input input-bordered"
                v-model="credentials.email"
                required
            />
          </div>

          <!-- Пароль -->
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">Пароль</span>
            </label>
            <input
                type="password"
                placeholder="••••••••"
                class="input input-bordered"
                v-model="credentials.password"
                required
            />
          </div>

          <!-- Имя пользователя -->
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">Ваше имя (отображается в шапке)</span>
            </label>
            <input
                type="text"
                placeholder="Иван Иванов"
                class="input input-bordered"
                v-model="credentials.name"
            />
          </div>

          <!-- Чекбокс "Запомнить меня" -->
          <div class="form-control mt-4">
            <label class="label cursor-pointer justify-start gap-3">
              <input type="checkbox" class="checkbox checkbox-sm" v-model="rememberMe" />
              <span class="label-text">Запомнить меня</span>
            </label>
          </div>

          <!-- Кнопка входа -->
          <div class="form-control mt-8">
            <button
                class="btn btn-primary"
                type="submit"
                :disabled="loading"
            >
              <span v-if="!loading">Войти</span>
              <span v-else class="loading loading-spinner"></span>
            </button>
          </div>

          <!-- Демо-аккаунты -->
          <div class="divider text-xs">Быстрый вход (демо)</div>

          <div class="grid grid-cols-2 gap-2">
            <button
                type="button"
                class="btn btn-outline btn-sm"
                @click="useDemoAccount('user')"
            >
              Обычный пользователь
            </button>
            <button
                type="button"
                class="btn btn-outline btn-sm"
                @click="useDemoAccount('admin')"
            >
              Администратор
            </button>
          </div>

          <!-- Ссылка на регистрацию -->
          <div class="text-center mt-6">
            <p class="text-sm opacity-70">
              Нет аккаунта?
              <a
                  class="link link-primary ml-1"
                  @click="handleRegister"
              >
                Зарегистрироваться
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const rememberMe = ref(false)

const credentials = ref({
  email: '',
  password: '',
  name: ''
})

// Демо-аккаунты
const demoAccounts = {
  user: {
    email: 'user@example.com',
    password: 'password123',
    name: 'Обычный Пользователь',
    isAdmin: false
  },
  admin: {
    email: 'admin@gameboy.dev',
    password: 'admin123',
    name: 'Администратор',
    isAdmin: true
  }
}

const handleLogin = async () => {
  try {
    loading.value = true

    // Имитация запроса к API
    await new Promise(resolve => setTimeout(resolve, 1000))

    // В демо-режиме все данные подходят
    const isAdmin = credentials.value.email.includes('admin')
    const userName = credentials.value.name ||
        (isAdmin ? 'Администратор' : 'Пользователь')

    // Сохраняем в localStorage (в реальном приложении - токен)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false')
    localStorage.setItem('userEmail', credentials.value.email)
    localStorage.setItem('userName', userName)

    if (rememberMe.value) {
      // Сохраняем для авто-заполнения при следующем посещении
      localStorage.setItem('rememberedEmail', credentials.value.email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }

    // Генерируем событие для обновления шапки
    window.dispatchEvent(new Event('storage'))

    // Перенаправляем
    router.push(isAdmin ? '/admin' : '/')

  } catch (error) {
    console.error('Ошибка авторизации:', error)
    alert('Ошибка входа. Проверьте данные.')
  } finally {
    loading.value = false
  }
}

const useDemoAccount = (type) => {
  const account = demoAccounts[type]
  credentials.value = { ...account }

  // Автоматический вход
  handleLogin()
}

const handleRegister = () => {
  alert('Регистрация появится позже!')

  // В будущем: router.push('/register')
}

// Восстановление email если запомнен
onMounted(() => {
  const savedEmail = localStorage.getItem('rememberedEmail')
  if (savedEmail) {
    credentials.value.email = savedEmail
    rememberMe.value = true
  }
})
</script>