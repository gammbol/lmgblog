<template>
  <div class="max-w-4xl mx-auto">
    <!-- Загрузка -->
    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-4">Загружаем пост...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="alert alert-error">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Ошибка загрузки: {{ error }}</span>
      <button class="btn btn-sm" @click="fetchPost">Попробовать снова</button>
    </div>

    <!-- Контент поста -->
    <div v-else class="space-y-8">
      <!-- Навигация -->
      <div class="text-sm breadcrumbs">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/posts">Посты</router-link></li>
          <li>{{ post.title }}</li>
        </ul>
      </div>

      <!-- Заголовок поста -->
      <article>
        <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>

        <div class="flex items-center gap-4 mb-8">
          <div class="avatar">
            <div class="w-12 rounded-full">
              <img :src="post.authorAvatar" :alt="post.author" />
            </div>
          </div>
          <div>
            <div class="font-semibold">{{ post.author }}</div>
            <div class="text-sm opacity-70">Post ID: {{ post.id }} • {{ formatDate(post.date) }}</div>
          </div>
          <div class="flex-grow"></div>
          <div class="flex gap-2">
            <span v-for="tag in post.tags" :key="tag" class="badge badge-outline">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Содержимое поста -->
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed whitespace-pre-line">{{ post.content }}</p>
        </div>

        <!-- Статистика -->
        <div class="divider"></div>
        <div class="flex justify-between text-sm opacity-70">
          <span>Автор: {{ post.author }}</span>
          <span>Комментариев: {{ comments.length }}</span>
        </div>
      </article>

      <!-- Комментарии -->
      <section class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Комментарии ({{ comments.length }})</h2>

        <!-- Загрузка комментариев -->
        <div v-if="commentsLoading" class="text-center py-6">
          <span class="loading loading-spinner"></span>
          <p class="mt-2">Загружаем комментарии...</p>
        </div>

        <!-- Список комментариев -->
        <div v-else class="space-y-6">
          <div v-for="comment in comments" :key="comment.id" class="card bg-base-100">
            <div class="card-body">
              <div class="flex items-start gap-4">
                <div class="avatar">
                  <div class="w-10 rounded-full">
                    <img :src="comment.avatar" :alt="comment.name" />
                  </div>
                </div>
                <div class="flex-grow">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-bold">{{ comment.name }}</h4>
                      <p class="text-sm opacity-70">{{ comment.email }}</p>
                    </div>
                    <span class="text-xs opacity-50">#{{ comment.id }}</span>
                  </div>
                  <p class="mt-3">{{ comment.body }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Форма добавления комментария -->
        <div class="card bg-base-100 shadow-lg mt-8">
          <div class="card-body">
            <h3 class="card-title">Добавить комментарий</h3>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Имя</span>
              </label>
              <input
                  type="text"
                  class="input input-bordered"
                  v-model="newComment.name"
                  placeholder="Ваше имя"
              >
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                  type="email"
                  class="input input-bordered"
                  v-model="newComment.email"
                  placeholder="email@example.com"
              >
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Комментарий</span>
              </label>
              <textarea
                  class="textarea textarea-bordered h-32"
                  v-model="newComment.body"
                  placeholder="Напишите ваш комментарий..."
              ></textarea>
            </div>
            <div class="form-control mt-6">
              <button
                  class="btn btn-primary"
                  @click="addComment"
                  :disabled="!newComment.name || !newComment.body"
              >
                Отправить комментарий
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const API_BASE = 'https://jsonplaceholder.typicode.com'

// Состояние
const post = ref({})
const comments = ref([])
const loading = ref(true)
const commentsLoading = ref(true)
const error = ref(null)

// Новый комментарий
const newComment = ref({
  name: '',
  email: '',
  body: ''
})

// Загрузка поста
const fetchPost = async () => {
  try {
    loading.value = true
    error.value = null

    const postId = route.params.id
    const [postResponse, usersResponse] = await Promise.all([
      fetch(`${API_BASE}/posts/${postId}`),
      fetch(`${API_BASE}/users`)
    ])

    if (!postResponse.ok || !usersResponse.ok) {
      throw new Error('Ошибка загрузки данных')
    }

    const postData = await postResponse.json()
    const users = await usersResponse.json()
    const user = users.find(u => u.id === postData.userId)

    // Преобразуем пост
    post.value = {
      id: postData.id,
      title: postData.title,
      content: postData.body,
      author: user ? user.name : 'Анонимный автор',
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${postData.userId}`,
      date: new Date().toISOString().split('T')[0],
      tags: ['эмуляция', 'gameboy', 'разработка'],
      userId: postData.userId
    }

  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки поста:', err)
  } finally {
    loading.value = false
  }
}

// Загрузка комментариев
const fetchComments = async () => {
  try {
    commentsLoading.value = true
    const postId = route.params.id
    const response = await fetch(`${API_BASE}/posts/${postId}/comments`)

    if (!response.ok) throw new Error('Ошибка загрузки комментариев')

    const commentsData = await response.json()
    comments.value = commentsData.map(comment => ({
      ...comment,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=comment${comment.id}`
    }))

  } catch (err) {
    console.error('Ошибка загрузки комментариев:', err)
  } finally {
    commentsLoading.value = false
  }
}

// Добавление комментария
const addComment = async () => {
  if (!newComment.value.name || !newComment.value.body) {
    alert('Заполните имя и комментарий')
    return
  }

  try {
    const postId = route.params.id

    // Отправка на API (демо-режим)
    const response = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        postId: parseInt(postId),
        name: newComment.value.name,
        email: newComment.value.email || 'user@example.com',
        body: newComment.value.body
      })
    })

    if (!response.ok) throw new Error('Ошибка отправки комментария')

    const createdComment = await response.json()

    // Добавляем локально
    comments.value.unshift({
      ...createdComment,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newComment.value.email || 'comment'}`
    })

    // Очищаем форму
    newComment.value = { name: '', email: '', body: '' }

    alert('Комментарий добавлен!')

  } catch (err) {
    console.error('Ошибка добавления комментария:', err)
    alert('Ошибка при добавлении комментария')
  }
}

// Форматирование даты
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Загрузка при монтировании
onMounted(() => {
  fetchPost()
  fetchComments()
})
</script>