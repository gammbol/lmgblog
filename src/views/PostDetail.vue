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
          <li class="truncate max-w-xs">{{ post.title }}</li>
        </ul>
      </div>

      <!-- Заголовок поста -->
      <article>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ post.title }}</h1>

        <div class="flex items-center gap-4 mb-8 flex-wrap">
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="w-10 md:w-12 rounded-full">
                <img :src="post.authorAvatar" :alt="post.author" />
              </div>
            </div>
            <div>
              <div class="font-semibold">{{ post.author }}</div>
              <div class="text-sm opacity-70">{{ formatDate(post.date) }}</div>
            </div>
          </div>
          <div class="flex-grow"></div>
          <div class="flex gap-2">
            <span v-for="tag in post.tags" :key="tag" class="badge badge-outline">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Содержимое поста -->
        <div class="prose max-w-none bg-base-100 p-6 rounded-2xl shadow-sm">
          <p class="text-lg leading-relaxed whitespace-pre-line">{{ post.content }}</p>
        </div>

        <!-- Действия с постом -->
        <div class="flex justify-between items-center mt-8 p-4 bg-base-100 rounded-2xl">
          <div class="flex gap-4">
            <button class="btn btn-ghost btn-sm" @click="likePost">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              {{ post.likes || 0 }}
            </button>
            <button class="btn btn-ghost btn-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {{ comments.length }} комментариев
            </button>
          </div>

          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
              <li><a>Поделиться</a></li>
              <li><a>Сохранить</a></li>
              <li v-if="isAdmin"><a @click="editPost">Редактировать</a></li>
            </ul>
          </div>
        </div>
      </article>

      <!-- Комментарии -->
      <section class="mt-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold">Комментарии <span class="opacity-70">({{ comments.length }})</span></h2>
          <button class="btn btn-sm btn-ghost" @click="refreshComments">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Обновить
          </button>
        </div>

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
                    <div class="flex items-center gap-2">
                      <span class="text-xs opacity-50">#{{ comment.id }}</span>
                      <button class="btn btn-xs btn-ghost" @click="reportComment(comment.id)">
                        ⚠️
                      </button>
                    </div>
                  </div>
                  <p class="mt-3">{{ comment.body }}</p>
                  <div class="flex gap-4 mt-4 text-sm opacity-70">
                    <button class="btn btn-xs btn-ghost" @click="likeComment(comment.id)">
                      👍 {{ comment.likes || 0 }}
                    </button>
                    <button class="btn btn-xs btn-ghost" @click="replyToComment(comment)">
                      Ответить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Форма добавления комментария -->
        <div class="card bg-base-100 shadow-lg mt-8">
          <div class="card-body">
            <div v-if="!isAuthenticated" class="alert alert-warning">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>
                Чтобы оставить комментарий, необходимо
                <router-link to="/login" class="link link-primary font-semibold">войти</router-link>
              </span>
            </div>

            <div v-else>
              <div class="flex items-center gap-3 mb-6">
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img :src="currentUser.avatar" :alt="currentUser.name" />
                  </div>
                </div>
                <div>
                  <h3 class="font-bold text-lg">Добавить комментарий</h3>
                  <p class="text-sm opacity-70">Вы вошли как {{ currentUser.name }}</p>
                </div>
              </div>

              <form @submit.prevent="addComment">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Ваш комментарий</span>
                  </label>
                  <textarea
                      class="textarea textarea-bordered h-32"
                      v-model="newComment.body"
                      placeholder="Напишите ваш комментарий..."
                      required
                  ></textarea>
                </div>

                <div class="flex justify-between items-center mt-6">
                  <div class="text-sm opacity-70">
                    Комментарий будет опубликован от имени
                    <span class="font-semibold">{{ currentUser.name }}</span>
                  </div>
                  <button
                      class="btn btn-primary"
                      type="submit"
                      :disabled="!newComment.body.trim() || isSubmitting"
                  >
                    <span v-if="!isSubmitting">Отправить комментарий</span>
                    <span v-else class="loading loading-spinner"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Навигация между постами -->
        <div class="flex justify-between mt-12 pt-6 border-t">
          <button
              v-if="prevPost"
              class="btn btn-outline"
              @click="$router.push(`/posts/${prevPost.id}`)"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ prevPost.title }}
          </button>
          <div v-else></div>

          <button
              v-if="nextPost"
              class="btn btn-outline"
              @click="$router.push(`/posts/${nextPost.id}`)"
          >
            {{ nextPost.title }}
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const API_BASE = 'https://jsonplaceholder.typicode.com'

// Состояние
const post = ref({})
const comments = ref([])
const allPosts = ref([])
const loading = ref(true)
const commentsLoading = ref(true)
const isSubmitting = ref(false)
const error = ref(null)

// Новый комментарий
const newComment = ref({
  body: ''
})

// Загрузка всех постов для навигации
const fetchAllPosts = async () => {
  try {
    const response = await fetch(`${API_BASE}/posts`)
    allPosts.value = await response.json()
  } catch (err) {
    console.error('Ошибка загрузки постов:', err)
  }
}

// Загрузка поста
const fetchPost = async () => {
  try {
    loading.value = true
    error.value = null

    const postId = parseInt(route.params.id)

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
      userId: postData.userId,
      likes: Math.floor(Math.random() * 50) // Рандомное число лайков для демо
    }

    // Загружаем комментарии для этого поста
    await fetchComments()

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

    // Добавляем лайки для демо
    comments.value = commentsData.map(comment => ({
      ...comment,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=comment${comment.id}`,
      likes: Math.floor(Math.random() * 20)
    }))

  } catch (err) {
    console.error('Ошибка загрузки комментариев:', err)
  } finally {
    commentsLoading.value = false
  }
}

// Добавление комментария
const addComment = async () => {
  if (!isAuthenticated.value) {
    alert('Войдите, чтобы оставить комментарий')
    return
  }

  if (!newComment.value.body.trim()) {
    alert('Введите текст комментария')
    return
  }

  try {
    isSubmitting.value = true
    const postId = parseInt(route.params.id)

    const commentData = {
      postId: postId,
      name: currentUser.value.name,
      email: currentUser.value.email || 'user@example.com',
      body: newComment.value.body
    }

    // Отправка на API (демо-режим)
    const response = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(commentData)
    })

    if (!response.ok) throw new Error('Ошибка отправки комментария')

    const createdComment = await response.json()

    // Добавляем локально с аватаром и лайками
    comments.value.unshift({
      ...createdComment,
      avatar: currentUser.value.avatar,
      likes: 0
    })

    // Очищаем форму
    newComment.value = { body: '' }

    // Уведомление
    alert('Комментарий добавлен успешно!')

  } catch (err) {
    console.error('Ошибка добавления комментария:', err)
    alert('Ошибка при добавлении комментария')
  } finally {
    isSubmitting.value = false
  }
}

// Обновление комментариев
const refreshComments = () => {
  fetchComments()
}

// Лайк поста
const likePost = () => {
  if (!post.value.likes) post.value.likes = 0
  post.value.likes++

  // В реальном приложении здесь будет запрос к API
  localStorage.setItem(`liked_post_${post.value.id}`, 'true')
}

// Лайк комментария
const likeComment = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    if (!comment.likes) comment.likes = 0
    comment.likes++
  }
}

// Ответ на комментарий
const replyToComment = (comment) => {
  newComment.value.body = `@${comment.name}, `
}

// Жалоба на комментарий
const reportComment = (commentId) => {
  if (confirm('Пожаловаться на этот комментарий?')) {
    alert('Жалоба отправлена модераторам')
    // В реальном приложении здесь будет запрос к API
  }
}

// Редактирование поста (для админов)
const editPost = () => {
  if (isAdmin.value) {
    alert('Редактирование поста (в демо-режиме не работает)')
  } else {
    alert('Требуются права администратора')
  }
}

// Навигация между постами
const currentPostIndex = computed(() => {
  return allPosts.value.findIndex(p => p.id === parseInt(route.params.id))
})

const prevPost = computed(() => {
  if (currentPostIndex.value > 0) {
    const prev = allPosts.value[currentPostIndex.value - 1]
    return {
      id: prev.id,
      title: prev.title.length > 30 ? prev.title.substring(0, 30) + '...' : prev.title
    }
  }
  return null
})

const nextPost = computed(() => {
  if (currentPostIndex.value < allPosts.value.length - 1 && currentPostIndex.value !== -1) {
    const next = allPosts.value[currentPostIndex.value + 1]
    return {
      id: next.id,
      title: next.title.length > 30 ? next.title.substring(0, 30) + '...' : next.title
    }
  }
  return null
})

// Текущий пользователь
const currentUser = computed(() => {
  const name = localStorage.getItem('userName') || 'Гость'
  const email = localStorage.getItem('userEmail') || ''
  return {
    name,
    email,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email || name}`
  }
})

const isAuthenticated = computed(() => {
  return localStorage.getItem('isAuthenticated') === 'true'
})

const isAdmin = computed(() => {
  return localStorage.getItem('isAdmin') === 'true'
})

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
onMounted(async () => {
  await fetchAllPosts()
  await fetchPost()
})

// Следим за изменением route
watch(() => route.params.id, () => {
  if (route.name === 'PostDetail') {
    fetchPost()
  }
})
</script>

<style scoped>
.prose {
  line-height: 1.8;
}

.prose p {
  margin-bottom: 1.5em;
}

.breadcrumbs ul {
  flex-wrap: wrap;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>