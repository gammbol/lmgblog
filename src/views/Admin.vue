<template>
  <div class="space-y-8">
    <!-- Заголовок -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Админ-панель</h1>
      <p class="text-lg opacity-80 max-w-2xl mx-auto">
        Управление постами и создание нового контента для блога
      </p>
    </div>

    <!-- Форма создания поста -->
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-6">Создать новый пост</h2>

            <form @submit.prevent="createPost">
              <!-- Заголовок -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Заголовок поста</span>
                </label>
                <input
                    type="text"
                    class="input input-bordered"
                    placeholder="Введите заголовок..."
                    v-model="newPost.title"
                    required
                />
              </div>

              <!-- Контент -->
              <div class="form-control mt-4">
                <label class="label">
                  <span class="label-text font-semibold">Содержание</span>
                </label>
                <textarea
                    class="textarea textarea-bordered h-64"
                    placeholder="Напишите содержание поста..."
                    v-model="newPost.content"
                    required
                ></textarea>
              </div>

              <!-- Автор -->
              <div class="form-control mt-4">
                <label class="label">
                  <span class="label-text font-semibold">ID автора (от 1 до 10)</span>
                </label>
                <input
                    type="number"
                    class="input input-bordered"
                    v-model="newPost.userId"
                    min="1"
                    max="10"
                    required
                />
                <div class="text-sm opacity-70 mt-2">
                  Используется для демо с JSONPlaceholder
                </div>
              </div>

              <!-- Кнопки -->
              <div class="form-control mt-8">
                <div class="flex gap-4">
                  <button
                      type="submit"
                      class="btn btn-primary flex-1"
                      :disabled="isSubmitting"
                  >
                    <span v-if="!isSubmitting">Опубликовать пост</span>
                    <span v-else class="loading loading-spinner"></span>
                  </button>
                  <button type="button" class="btn btn-outline" @click="resetForm">
                    Очистить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Информация -->
      <div>
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-6">Информация</h2>

            <div class="space-y-4">
              <div class="alert alert-info">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Используется JSONPlaceholder API</span>
              </div>

              <p class="text-sm">
                Посты создаются в демо-режиме и не сохраняются на сервере, но вы получите ответ с ID нового поста.
              </p>

              <div class="stats stats-vertical shadow w-full">
                <div class="stat">
                  <div class="stat-title">API Endpoint</div>
                  <div class="stat-value text-sm font-mono">POST /posts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Последний созданный пост -->
        <div class="card bg-base-100 shadow-lg mt-8" v-if="lastCreatedPost">
          <div class="card-body">
            <h3 class="card-title">Последний созданный пост</h3>
            <div class="space-y-2">
              <p><strong>ID:</strong> {{ lastCreatedPost.id }}</p>
              <p><strong>Заголовок:</strong> {{ lastCreatedPost.title }}</p>
              <p><strong>Автор ID:</strong> {{ lastCreatedPost.userId }}</p>
              <div class="card-actions justify-end mt-4">
                <button
                    class="btn btn-sm btn-outline"
                    @click="$router.push(`/posts/${lastCreatedPost.id}`)"
                >
                  Посмотреть
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const API_BASE = 'https://jsonplaceholder.typicode.com'

const isSubmitting = ref(false)
const lastCreatedPost = ref(null)

const newPost = ref({
  title: '',
  content: '',
  userId: 1
})

const createPost = async () => {
  try {
    isSubmitting.value = true

    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newPost.value)
    })

    if (!response.ok) throw new Error('Ошибка создания поста')

    const createdPost = await response.json()
    lastCreatedPost.value = createdPost

    // Показываем уведомление
    alert(`Пост успешно создан! ID: ${createdPost.id}`)

    // Редирект на новый пост
    router.push(`/posts/${createdPost.id}`)

  } catch (error) {
    console.error('Ошибка создания поста:', error)
    alert('Ошибка при создании поста')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  newPost.value = {
    title: '',
    content: '',
    userId: 1
  }
}
</script>