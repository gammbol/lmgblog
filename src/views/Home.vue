<template>
  <div class="space-y-16">
    <!-- Герой-секция -->
    <section class="hero min-h-[70vh] rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20">
      <div class="hero-content text-center">
        <div class="max-w-4xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Разработка эмулятора <span class="text-primary">GameBoy</span> с нуля
          </h1>
          <p class="text-lg md:text-xl mb-10 opacity-90">
            Погрузитесь в мир низкоуровневого программирования, реверс-инжиниринга и ностальгии через мой открытый блог о разработке.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/posts" class="btn btn-primary btn-lg">
              Читать блог
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </router-link>
            <a href="https://github.com/gammbol/lmgb" target="_blank" class="btn btn-outline btn-lg">
              <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Исходный код
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Раздел "О проекте" -->
    <section id="about-project">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">О проекте</h2>
        <p class="text-lg opacity-80 max-w-3xl mx-auto">
          Эмулятор GameBoy — это сложный программный проект, который затрагивает архитектуру процессора Z80, графический пайплайн, управление памятью и воссоздание оригинального "feeling" консоли.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div class="space-y-6">
          <h3 class="text-2xl font-bold">Почему именно эмулятор GameBoy?</h3>
          <p class="text-base">
            GameBoy обладает идеальным балансом сложности и доступности для изучения эмуляции. Это 8-битная система с достаточно простой, но полной архитектурой.
          </p>
          <p class="text-base">
            Моя цель — не просто создать рабочий эмулятор, но и подробно документировать каждый шаг, чтобы помочь другим разработчикам погрузиться в эту увлекательную область.
          </p>
        </div>
        <div class="bg-base-200 rounded-2xl p-8 shadow-xl">
          <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div class="stat">
              <div class="stat-title">Год выпуска GameBoy</div>
              <div class="stat-value text-primary">1989</div>
              <div class="stat-desc">35 лет назад!</div>
            </div>
            <div class="stat">
              <div class="stat-title">Частота CPU</div>
              <div class="stat-value text-secondary">4.19 МГц</div>
              <div class="stat-desc">Невероятно для своего времени</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Последние посты с API -->
    <section id="latest-posts">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Последние посты</h2>
        <p class="text-lg opacity-80 max-w-3xl mx-auto">
          Свежие обновления о ходе разработки
        </p>
      </div>

      <div v-if="loading" class="text-center">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <div v-else-if="error" class="alert alert-error">
        <span>Ошибка загрузки: {{ error }}</span>
      </div>

      <div v-else>
        <div class="grid md:grid-cols-3 gap-6">
          <div
              v-for="post in latestPosts"
              :key="post.id"
              class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              @click="$router.push(`/posts/${post.id}`)"
          >
            <div class="card-body">
              <h3 class="card-title">{{ post.title }}</h3>
              <p class="text-sm opacity-70">{{ formatDate(post.date) }} • {{ post.author }}</p>
              <p class="mt-3 line-clamp-2">{{ post.excerpt }}</p>
              <div class="card-actions justify-end mt-4">
                <button class="btn btn-sm btn-primary">Читать</button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <router-link to="/posts" class="btn btn-outline">
            Все посты
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_BASE = 'https://jsonplaceholder.typicode.com'

const latestPosts = ref([])
const loading = ref(true)
const error = ref(null)

const fetchLatestPosts = async () => {
  try {
    loading.value = true
    error.value = null

    // Берем только 3 последних поста
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`${API_BASE}/posts?_limit=3`),
      fetch(`${API_BASE}/users`)
    ])

    if (!postsResponse.ok || !usersResponse.ok) {
      throw new Error('Ошибка загрузки данных')
    }

    const posts = await postsResponse.json()
    const users = await usersResponse.json()

    // Преобразуем данные
    latestPosts.value = posts.map(post => {
      const user = users.find(u => u.id === post.userId)
      return {
        id: post.id,
        title: post.title,
        excerpt: post.body.length > 80 ? post.body.substring(0, 80) + '...' : post.body,
        author: user ? user.name : 'Анонимный автор',
        date: new Date().toISOString().split('T')[0]
      }
    })

  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  fetchLatestPosts()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>