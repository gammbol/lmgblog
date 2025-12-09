import { ref, computed } from 'vue'

// Реактивное состояние авторизации
const userState = ref({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  email: localStorage.getItem('userEmail') || '',
  name: localStorage.getItem('userName') || ''
})

// Вычисляемые свойства
const isAuthenticated = computed(() => userState.value.isAuthenticated)
const isAdmin = computed(() => userState.value.isAdmin)
const userName = computed(() => userState.value.name || (userState.value.isAdmin ? 'Администратор' : 'Пользователь'))
const userEmail = computed(() => userState.value.email)
const userAvatar = computed(() =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${userState.value.email || 'user'}`
)

// Методы
const login = (email, name, isAdmin = false) => {
  localStorage.setItem('isAuthenticated', 'true')
  localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false')
  localStorage.setItem('userEmail', email)
  localStorage.setItem('userName', name)

  userState.value = {
    isAuthenticated: true,
    isAdmin,
    email,
    name
  }

  // Генерируем событие для синхронизации между компонентами
  window.dispatchEvent(new Event('auth-change'))
}

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('isAdmin')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userName')

  userState.value = {
    isAuthenticated: false,
    isAdmin: false,
    email: '',
    name: ''
  }

  window.dispatchEvent(new Event('auth-change'))
}

// Функция для инициализации слушателя
const initAuthListener = () => {
  window.addEventListener('storage', (event) => {
    if (['isAuthenticated', 'isAdmin', 'userEmail', 'userName'].includes(event.key)) {
      userState.value = {
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        isAdmin: localStorage.getItem('isAdmin') === 'true',
        email: localStorage.getItem('userEmail') || '',
        name: localStorage.getItem('userName') || ''
      }
    }
  })
}

export function useAuth() {
  return {
    userState,
    isAuthenticated,
    isAdmin,
    userName,
    userEmail,
    userAvatar,
    login,
    logout,
    initAuthListener
  }
}