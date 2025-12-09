<template>
  <div class="max-w-6xl mx-auto space-y-12">
    <!-- Заголовок -->
    <div class="text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">О разработчике</h1>
      <p class="text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
        Привет! Я разработчик, увлеченный низкоуровневым программированием, ретро-консолями и созданием сложных систем.
      </p>
    </div>

    <!-- Основная информация -->
    <div class="grid lg:grid-cols-4 gap-8">
      <!-- Боковая панель с контактами -->
      <div class="lg:col-span-1 space-y-6">
        <div class="card bg-base-100 shadow-xl sticky top-8">
          <div class="card-body items-center text-center">
            <div class="avatar mb-4">
              <div class="w-32 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=gameboy-dev&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede" alt="Разработчик" />
              </div>
            </div>
            <h2 class="card-title">Разработчик</h2>
            <p class="opacity-70">Энтузиаст эмуляции и ретро-технологий</p>

            <div class="divider my-4"></div>

            <div class="space-y-4 w-full">
              <a
                  href="https://github.com/gammbol"
                  target="_blank"
                  class="btn btn-outline w-full justify-start gap-3 hover:bg-base-200"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>

              <a
                  href="https://t.me/tryingtothink"
                  target="_blank"
                  class="btn btn-outline w-full justify-start gap-3 hover:bg-base-200"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.4-1.08.39-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .3z" />
                </svg>
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Основной контент -->
      <div class="lg:col-span-3 space-y-8">
        <!-- Приветственная карточка -->
        <div class="card bg-gradient-to-br from-base-100 via-base-100 to-primary/5 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-3xl mb-4">Привет! 👋</h2>
            <div class="prose max-w-none">
              <span class="text-sm opacity-5">my name is slim shady</span>
              <p class="text-lg leading-relaxed">
                Я - tryingtothink, и я разработчик, увлеченный созданием эмулятора GameBoy с нуля.
                Этот проект для меня - способ углубиться в низкоуровневое программирование и понять,
                как работают ретро-консоли на аппаратном уровне.
              </p>
              <p class="text-lg leading-relaxed mt-4">
                Я веду этот блог, чтобы документировать свой путь и делиться знаниями с другими
                разработчиками, которые тоже интересуются эмуляцией и реверс-инжинирингом.
              </p>
            </div>
          </div>
        </div>

        <!-- Мой опыт и навыки -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-2xl mb-8">🛠️ Мой опыт и навыки</h3>

            <div class="grid md:grid-cols-2 gap-8">
              <!-- Технические навыки -->
              <div class="space-y-6">
                <h4 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Технические навыки
                </h4>

                <div v-for="skill in skills" :key="skill.name" class="space-y-2 group">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                      <div class="text-2xl transition-transform group-hover:scale-110">{{ skill.icon }}</div>
                      <span class="font-medium">{{ skill.name }}</span>
                    </div>
                    <span class="text-sm font-semibold">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-base-200 rounded-full h-2.5 overflow-hidden">
                    <div
                        class="h-2.5 rounded-full transition-all duration-1000 ease-out"
                        :class="skill.color"
                        :style="{ width: skill.level + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Опыт работы -->
              <div class="space-y-6">
                <h4 class="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Карьерный путь
                </h4>

                <div class="space-y-6">
                  <div
                      v-for="exp in experience"
                      :key="exp.title"
                      class="relative pl-10 pb-6 last:pb-0 group"
                  >
                    <!-- Иконка и линия -->
                    <div class="absolute left-0 top-0">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                           :class="exp.iconBg">
                        <span class="text-lg">{{ exp.icon }}</span>
                      </div>
                    </div>

                    <!-- Линия между пунктами -->
                    <div
                        v-if="exp !== experience[experience.length - 1]"
                        class="absolute left-4 top-8 bottom-0 w-0.5 bg-gradient-to-b from-base-300 to-transparent"
                    ></div>

                    <!-- Содержимое -->
                    <div class="space-y-2">
                      <div class="flex justify-between items-start flex-wrap gap-2">
                        <h5 class="font-bold text-lg">{{ exp.title }}</h5>
                        <span class="badge badge-outline badge-sm">{{ exp.period }}</span>
                      </div>
                      <p class="opacity-80">{{ exp.description }}</p>

                      <!-- Технологии -->
                      <div class="flex flex-wrap gap-2 mt-3">
                        <span
                            v-for="tech in exp.technologies"
                            :key="tech"
                            class="badge badge-sm badge-outline transition-all hover:badge-primary"
                        >
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Дополнительные компетенции -->
            <div class="mt-12 pt-8 border-t">
              <h4 class="text-xl font-bold mb-6 text-center">🎯 Другие компетенции</h4>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                    v-for="competency in competencies"
                    :key="competency.name"
                    class="card bg-base-100 border border-base-300 hover:border-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer"
                >
                  <div class="card-body items-center text-center p-4">
                    <div class="text-4xl mb-3 transition-transform group-hover:scale-110 group-hover:rotate-3">{{ competency.icon }}</div>
                    <h6 class="font-semibold">{{ competency.name }}</h6>
                    <p class="text-xs opacity-70 mt-1">{{ competency.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Цели проекта -->
        <div class="grid md:grid-cols-3 gap-6">
          <div
              v-for="goal in goals"
              :key="goal.title"
              class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="card-body items-center text-center">
              <div class="text-5xl mb-4">{{ goal.icon }}</div>
              <h4 class="card-title text-xl mb-3">{{ goal.title }}</h4>
              <p class="opacity-80">{{ goal.description }}</p>
            </div>
          </div>
        </div>

        <!-- Технологический стек -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-2xl mb-6">⚙️ Технологический стек проекта</h3>

            <div class="space-y-6">
              <!-- Frontend -->
              <div>
                <h4 class="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Frontend
                </h4>
                <div class="flex flex-wrap gap-3">
                  <span
                      v-for="tech in frontendTech"
                      :key="tech"
                      class="badge badge-lg gap-2 transition-all hover:scale-105"
                      :class="tech.color"
                  >
                    {{ tech.icon }} {{ tech.name }}
                  </span>
                </div>
              </div>

              <!-- Backend -->
              <div>
                <h4 class="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  Backend & Эмулятор
                </h4>
                <div class="flex flex-wrap gap-3">
                  <span
                      v-for="tech in backendTech"
                      :key="tech"
                      class="badge badge-lg gap-2 transition-all hover:scale-105"
                      :class="tech.color"
                  >
                    {{ tech.icon }} {{ tech.name }}
                  </span>
                </div>
              </div>

              <!-- Инструменты -->
              <div>
                <h4 class="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Инструменты
                </h4>
                <div class="flex flex-wrap gap-3">
                  <span
                      v-for="tech in tools"
                      :key="tech"
                      class="badge badge-lg badge-outline gap-2 transition-all hover:scale-105"
                  >
                    {{ tech.icon }} {{ tech.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Призыв к действию -->
        <div class="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
          <div class="card-body text-center">
            <h3 class="card-title text-2xl mb-4">Хотите узнать больше?</h3>
            <p class="mb-6">
              Следите за обновлениями в блоге, чтобы не пропустить новые статьи о разработке эмулятора!
            </p>
            <div class="card-actions justify-center">
              <router-link to="/posts" class="btn btn-accent">
                Читать блог
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Навыки с прогресс-барами
const skills = [
  { name: 'C++ & Системное программирование', level: 92, icon: '⚡', color: 'bg-gradient-to-r from-primary to-blue-500' },
  { name: 'Веб-разработка (Vue.js)', level: 88, icon: '🌐', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
  { name: 'Архитектура ПО', level: 85, icon: '🏗️', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { name: 'Эмуляция & Реверс-инжиниринг', level: 78, icon: '🔍', color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
  { name: 'Базы данных (PostgreSQL)', level: 75, icon: '🗄️', color: 'bg-gradient-to-r from-cyan-500 to-blue-400' },
  { name: 'DevOps & CI/CD', level: 70, icon: '🚀', color: 'bg-gradient-to-r from-red-500 to-pink-500' }
]

// Опыт работы
const experience = [
  {
    icon: '💻',
    iconBg: 'bg-primary text-primary-content',
    title: 'Разработчик эмулятора GameBoy',
    period: '2022 - настоящее время',
    description: 'Полный цикл разработки эмулятора с нуля: CPU, GPU, память, звук, отладка и тестирование.',
    technologies: ['C++20', 'SDL2', 'CMake', 'Unit Testing']
  },
  {
    icon: '⚙️',
    iconBg: 'bg-secondary text-secondary-content',
    title: 'Senior C++ Developer',
    period: '2020 - 2022',
    description: 'Разработка высоконагруженных систем, оптимизация производительности, работа с многопоточностью.',
    technologies: ['C++17', 'Linux', 'Multithreading', 'Network']
  },
  {
    icon: '🔧',
    iconBg: 'bg-accent text-accent-content',
    title: 'Emulation Engineer',
    period: '2018 - 2020',
    description: 'Исследование архитектур ретро-консолей, создание прототипов эмуляторов, анализ аппаратного обеспечения.',
    technologies: ['Z80', '6502', 'Debugging', 'Documentation']
  },
  {
    icon: '👨‍🏫',
    iconBg: 'bg-neutral text-neutral-content',
    title: 'Technical Mentor',
    period: '2016 - 2018',
    description: 'Обучение разработчиков основам программирования, code review, проведение воркшопов.',
    technologies: ['Teaching', 'Code Review', 'Workshops', 'Mentoring']
  }
]

// Дополнительные компетенции
const competencies = [
  { name: 'Алгоритмы', icon: '🧮', description: 'Сложность, оптимизация' },
  { name: 'Тестирование', icon: '🧪', description: 'Unit, интеграционные' },
  { name: 'Документация', icon: '📚', description: 'Техническое писательство' },
  { name: 'Коммуникация', icon: '💬', description: 'Презентации, доклады' }
]

// Цели проекта
const goals = [
  {
    icon: '🎯',
    title: 'Точная эмуляция',
    description: 'Создание максимально точного эмулятора оригинального железа GameBoy'
  },
  {
    icon: '📚',
    title: 'Образовательный контент',
    description: 'Подробное документирование каждого этапа разработки для других разработчиков'
  },
  {
    icon: '🔓',
    title: 'Открытый код',
    description: 'Весь исходный код проекта доступен на GitHub под открытой лицензией'
  }
]

// Технологии
const frontendTech = [
  { name: 'Vue.js 3', icon: '⚡', color: 'badge-primary' },
  { name: 'Vite', icon: '🚀', color: 'badge-secondary' },
  { name: 'Tailwind CSS', icon: '🎨', color: 'badge-accent' },
  { name: 'DaisyUI', icon: '✨', color: 'badge-info' }
]

const backendTech = [
  { name: 'C++20', icon: '⚙️', color: 'badge-primary' },
  { name: 'PostgreSQL', icon: '🐘', color: 'badge-secondary' },
  { name: 'SDL2', icon: '🎮', color: 'badge-accent' },
  { name: 'CMake', icon: '🔧', color: 'badge-info' }
]

const tools = [
  { name: 'Git', icon: '📦' },
  { name: 'Docker', icon: '🐳' },
  { name: 'VS Code', icon: '💻' },
  { name: 'Google Test', icon: '🧪' },
  { name: 'Postman', icon: '📬' },
  { name: 'Figma', icon: '🎨' }
]
</script>

<style scoped>
/* Плавные анимации для прогресс-баров */
@keyframes fillProgress {
  from { width: 0%; }
  to { width: attr(data-width); }
}

.w-full.bg-base-200 > div {
  animation: fillProgress 1.5s ease-out forwards;
}

/* Анимация для карточек при наведении */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Эффект параллакса для фона */
.bg-gradient-to-br {
  background-attachment: fixed;
}

/* Плавное появление элементов */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.relative {
  animation: fadeInUp 0.6s ease forwards;
}

.relative:nth-child(1) { animation-delay: 0.1s; }
.relative:nth-child(2) { animation-delay: 0.2s; }
.relative:nth-child(3) { animation-delay: 0.3s; }
.relative:nth-child(4) { animation-delay: 0.4s; }

/* Анимация для значков */
.text-2xl, .text-4xl, .text-5xl {
  transition: transform 0.3s ease;
}

/* Эффект свечения для иконок в компетенциях */
.group:hover .text-4xl {
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
}

/* Стили для бейджей технологий */
.badge {
  transition: all 0.2s ease;
}

.badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Адаптивные стили для мобильных */
@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .relative.pl-10 {
    padding-left: 3.5rem;
  }

  .sticky {
    position: relative;
    top: 0;
  }
}

/* Улучшенные стили для контейнера */
.max-w-6xl {
  max-width: 72rem;
}

/* Стили для аватара */
.avatar .rounded-full {
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
}

/* Эффект для карточек целей */
.card.hover\\:-translate-y-1:hover {
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
}
</style>