<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Вход в систему</h2>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
              type="email"
              placeholder="your@email.com"
              class="input input-bordered"
              v-model="email"
          />
        </div>

        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Пароль</span>
          </label>
          <input
              type="password"
              placeholder="••••••••"
              class="input input-bordered"
              v-model="password"
          />
        </div>

        <div class="form-control mt-6">
          <button class="btn btn-primary" @click="handleSubmit">
            Войти
          </button>
        </div>

        <div class="divider">Или</div>

        <div class="text-center">
          <p class="text-sm opacity-70">
            Нет аккаунта?
            <a class="link link-primary ml-1" @click="handleRegister">
              Зарегистрироваться
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleSubmit = () => {
  alert('Авторизация будет реализована позже!')
  // Временно перенаправляем на главную
  router.push('/')
}

const handleRegister = () => {
  alert('Регистрация появится позже!')
}
</script>