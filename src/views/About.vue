<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Заголовок -->
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">О разработчике</h1>
      <p class="text-lg opacity-80 max-w-2xl mx-auto">
        Привет! Я разработчик, который увлечен низкоуровневым программированием и ретро-консолями.
      </p>
    </div>

    <!-- Основная информация -->
    <div class="grid md:grid-cols-3 gap-8 items-start">
      <!-- Аватар и контакты -->
      <div class="md:col-span-1">
        <div class="card bg-base-100 shadow-lg sticky top-8">
          <div class="card-body items-center text-center">
            <div class="avatar mb-4">
              <div class="w-40 rounded-full">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=gameboy-dev" alt="Разработчик" />
              </div>
            </div>
            <h2 class="card-title">Разработчик</h2>
            <p class="opacity-70">Энтузиаст ретро-эмуляции</p>

            <div class="divider">Контакты</div>

            <div class="space-y-3 w-full">
              <a
                  href="https://github.com"
                  target="_blank"
                  class="btn btn-outline w-full justify-start"
              >
                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>

              <a
                  href="https://t.me"
                  target="_blank"
                  class="btn btn-outline w-full justify-start"
              >
                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.4-1.08.39-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .3z" />
                </svg>
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Текстовая информация -->
      <div class="md:col-span-2 space-y-6">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-2xl">Привет!</h2>
            <div class="prose max-w-none">
              <p>
                Меня зовут [ИМЯ], и я разработчик, увлеченный созданием эмулятора GameBoy с нуля.
                Этот проект для меня - способ углубиться в низкоуровневое программирование и понять,
                как работают ретро-консоли на аппаратном уровне.
              </p>
              <p>
                Я веду этот блог, чтобы документировать свой путь и делиться знаниями с другими
                разработчиками, которые тоже интересуются эмуляцией и реверс-инжинирингом.
              </p>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h3 class="card-title text-xl">Мой опыт</h3>
            <div class="space-y-4">
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h4 class="font-bold">Разработка на C++</h4>
                    <p class="text-sm opacity-70">Более 5 лет опыта в системном программировании</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h4 class="font-bold">Эмуляция</h4>
                    <p class="text-sm opacity-70">Изучение архитектуры 8-битных систем и их эмуляции</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h4 class="font-bold">Веб-разработка</h4>
                    <p class="text-sm opacity-70">Создание фронтенда для этого блога на Vue.js</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h3 class="card-title text-xl">Цели проекта</h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <span class="text-primary text-xl">🎯</span>
                <div>
                  <h4 class="font-semibold">Создание точного эмулятора</h4>
                  <p class="text-sm opacity-80">Полная эмуляция оригинального железа GameBoy</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-xl">📚</span>
                <div>
                  <h4 class="font-semibold">Образовательный контент</h4>
                  <p class="text-sm opacity-80">Подробные статьи о каждом этапе разработки</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-xl">🔧</span>
                <div>
                  <h4 class="font-semibold">Открытый исходный код</h4>
                  <p class="text-sm opacity-80">Весь код проекта доступен на GitHub</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h3 class="card-title text-xl">Стек технологий</h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-primary badge-lg">C++17/20</span>
              <span class="badge badge-secondary badge-lg">Vue.js 3</span>
              <span class="badge badge-accent badge-lg">Tailwind CSS</span>
              <span class="badge badge-outline badge-lg">SDL2</span>
              <span class="badge badge-outline badge-lg">PostgreSQL</span>
              <span class="badge badge-outline badge-lg">CMake</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  position: relative;
  padding-left: 24px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #e5e7eb;
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
}

.timeline-marker {
  position: absolute;
  left: -26px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3b82f6;
  border: 2px solid white;
  box-shadow: 0 0 0 2px #3b82f6;
}

.timeline-content {
  margin-left: 0;
}
</style>