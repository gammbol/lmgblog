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

// API конфигурация
const API_BASE = 'https://jsonplaceholder.typicode.com'

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

    if (!postsResponse.ok || !usersResponse.ok) {
      throw new Error('Ошибка загрузки данных')
    }

    allPosts.value = await postsResponse.json()
    users.value = await usersResponse.json()

  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки:', err)
  } finally {
    loading.value = false
  }
}

// Преобразованные посты
const transformedPosts = computed(() => {
  return allPosts.value.map(post => {
    const user = users.value.find(u => u.id === post.userId)
    const tags = ['эмуляция', 'gameboy', 'разработка', 'c++', 'программирование']

    return {
      id: post.id,
      title: post.title,
      excerpt: post.body.length > 100 ? post.body.substring(0, 100) + '...' : post.body,
      author: user ? user.name : 'Анонимный автор',
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${post.userId}`,
      date: new Date().toISOString().split('T')[0], // Фиктивная дата
      tags: tags.slice(0, Math.floor(Math.random() * 3) + 1),
      fullContent: post.body,
      userId: post.userId
    }
  })
})

// Фильтрация и поиск (пока без поиска)
const filteredPosts = computed(() => {
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
</style>