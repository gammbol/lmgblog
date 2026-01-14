<template>
  <div class="space-y-8">
    <!-- Заголовок -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Все посты о разработке</h1>
      <p class="text-lg opacity-80 max-w-2xl mx-auto">
        Здесь я делюсь своим опытом разработки эмулятора GameBoy, техническими деталями и проблемами, с которыми сталкиваюсь.
      </p>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-4">Загружаем посты...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="alert alert-error">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Ошибка загрузки постов: {{ error }}</span>
    </div>

    <!-- Сообщение "Постов нет" -->
    <div v-else-if="filteredPosts.length === 0" class="text-center py-16">
      <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-base-200 mb-6">
        <svg class="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold mb-3">Постов пока нет</h3>
      <p class="text-lg opacity-80 mb-8 max-w-md mx-auto">Пора что-то написать и поделиться своим опытом!</p>

      <!-- Кнопка для создания поста (видна всем, но при клике проверяет авторизацию) -->
      <button
          @click="handleCreatePostClick"
          class="btn btn-primary"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Создать первый пост
      </button>
    </div>

    <!-- Список постов -->
    <div v-else>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="post in paginatedPosts"
            :key="post.id"
            class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            @click="$router.push(`/posts/${post.id}`)"
        >
          <div class="card-body">
            <h3 class="card-title text-lg">{{ post.title }}</h3>
            <div class="flex items-center gap-2 text-sm opacity-70">
              <div class="avatar">
                <div class="w-8 rounded-full">
                  <img :src="post.authorAvatar" :alt="post.author" />
                </div>
              </div>
              <span>{{ post.author }}</span>
              <span>•</span>
              <span>Post ID: {{ post.id }}</span>
            </div>
            <p class="mt-4 line-clamp-3">{{ post.excerpt }}</p>
            <div class="card-actions justify-between items-center mt-6">
              <div class="badge badge-outline" v-for="tag in post.tags" :key="tag">
                {{ tag }}
              </div>
              <button class="btn btn-ghost btn-sm">
                Читать
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Пагинация -->
      <div class="flex justify-center mt-8" v-if="totalPages > 1">
        <div class="join">
          <button
              class="join-item btn"
              :class="{ 'btn-disabled': currentPage === 1 }"
              @click="changePage(currentPage - 1)"
          >
            «
          </button>

          <button
              v-for="page in visiblePages"
              :key="page"
              class="join-item btn"
              :class="{ 'btn-active': page === currentPage }"
              @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button
              class="join-item btn"
              :class="{ 'btn-disabled': currentPage === totalPages }"
              @click="changePage(currentPage + 1)"
          >
            »
          </button>
        </div>
      </div>

      <!-- Информация о странице -->
      <div class="text-center opacity-70 text-sm mt-4">
        Показаны {{ startItem }}-{{ endItem }} из {{ filteredPosts.length }} постов
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// API конфигурация
const API_BASE = 'http://localhost:3000/api'

// Состояние
const allPosts = ref([])
const users = ref([])
const loading = ref(true)
const error = ref(null)

// Фильтрация и пагинация
const currentPage = ref(1)
const postsPerPage = 9

// Загрузка данных
const fetchData = async () => {
  try {
    loading.value = true
    error.value = null

    // Параллельная загрузка постов и пользователей
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`${API_BASE}/posts`),
      fetch(`${API_BASE}/users`)
    ])

    // Проверка статуса ответов
    if (!postsResponse.ok) {
      throw new Error(`Ошибка загрузки постов: ${postsResponse.status} ${postsResponse.statusText}`)
    }

    if (!usersResponse.ok) {
      throw new Error(`Ошибка загрузки пользователей: ${usersResponse.status} ${usersResponse.statusText}`)
    }

    // Парсинг JSON
    const postsData = await postsResponse.json()
    const usersData = await usersResponse.json()

    // Проверка успешности ответа от API
    if (postsData.success === false) {
      throw new Error(postsData.error || 'Неизвестная ошибка при загрузке постов')
    }

    if (usersData.success === false) {
      throw new Error(usersData.error || 'Неизвестная ошибка при загрузке пользователей')
    }

    // Сохраняем данные
    allPosts.value = postsData.posts || postsData // Поддержка обоих форматов
    users.value = usersData.users || usersData // Поддержка обоих форматов

    console.log('Загружено постов:', allPosts.value.length)
    console.log('Загружено пользователей:', users.value.length)

  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки:', err)
  } finally {
    loading.value = false
  }
}

// Обработчик клика по кнопке "Создать первый пост"
const handleCreatePostClick = () => {
  // Проверяем наличие токена (простая проверка авторизации)
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')

  if (token) {
    // Если пользователь авторизован, перенаправляем на страницу создания поста
    router.push('/admin/new-post')
  } else {
    // Если не авторизован, перенаправляем на страницу входа
    router.push('/login')
  }
}

// Преобразованные посты
const transformedPosts = computed(() => {
  // Если постов нет, возвращаем пустой массив
  if (!allPosts.value || allPosts.value.length === 0) {
    return []
  }

  // Проверяем формат данных (массив или объект с полем posts)
  const postsArray = Array.isArray(allPosts.value)
      ? allPosts.value
      : (allPosts.value.posts || [])

  return postsArray.map(post => {
    // Находим автора поста
    let user = null
    if (users.value && users.value.length > 0) {
      // Проверяем разные возможные форматы данных о пользователях
      const usersArray = Array.isArray(users.value)
          ? users.value
          : (users.value.users || [])

      user = usersArray.find(u => {
        // Проверяем разные возможные форматы ID
        const postAuthorId = post.author_id || post.authorId || post.userId
        const userId = u.id || u.userId

        return postAuthorId && userId && postAuthorId.toString() === userId.toString()
      })
    }

    // Теги для постов
    const tags = ['эмуляция', 'gameboy', 'разработка', 'c++', 'программирование']

    return {
      id: post.id || post.postId || 0,
      title: post.title || 'Без названия',
      excerpt: post.excerpt || (post.content
          ? (post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content)
          : 'Нет описания'),
      author: user
          ? (user.display_name || user.username || user.name || 'Анонимный автор')
          : 'Анонимный автор',
      authorAvatar: user && user.avatar_url
          ? user.avatar_url
          : `https://api.dicebear.com/7.x/avataaars/svg?seed=user${post.userId || post.author_id || 0}`,
      date: post.created_at
          ? new Date(post.created_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      tags: post.tags && post.tags.length > 0
          ? post.tags.slice(0, 3)
          : tags.slice(0, Math.floor(Math.random() * 3) + 1),
      fullContent: post.content || post.body || '',
      userId: post.userId || post.author_id || 0
    }
  })
})

// Фильтрация и поиск (пока без поиска)
const filteredPosts = computed(() => {
  if (transformedPosts.value.length === 0) {
    return []
  }
  return [...transformedPosts.value].reverse() // Новые первыми
})

// Пагинация
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const startItem = computed(() => (currentPage.value - 1) * postsPerPage + 1)
const endItem = computed(() => {
  const end = currentPage.value * postsPerPage
  return end > filteredPosts.value.length ? filteredPosts.value.length : end
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Методы
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Загрузка при монтировании
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.alert-error {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: hsl(0, 84.2%, 60.2%);
  color: white;
}

.card {
  transition: all 0.3s ease;
  border: 1px solid hsl(var(--b2));
}

.card:hover {
  transform: translateY(-4px);
  border-color: hsl(var(--p));
}

.btn-primary {
  background-color: hsl(var(--p));
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: hsl(var(--pf));
}
</style>