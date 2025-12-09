const API_BASE = 'https://jsonplaceholder.typicode.com'

export const api = {
  // Посты
  async getPosts(limit = null) {
    const url = limit ? `${API_BASE}/posts?_limit=${limit}` : `${API_BASE}/posts`
    const response = await fetch(url)
    return response.json()
  },

  async getPost(id) {
    const response = await fetch(`${API_BASE}/posts/${id}`)
    return response.json()
  },

  async createPost(postData) {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(postData)
    })
    return response.json()
  },

  // Пользователи
  async getUsers() {
    const response = await fetch(`${API_BASE}/users`)
    return response.json()
  },

  async getUser(id) {
    const response = await fetch(`${API_BASE}/users/${id}`)
    return response.json()
  },

  // Комментарии
  async getComments(postId) {
    const response = await fetch(`${API_BASE}/posts/${postId}/comments`)
    return response.json()
  },

  async createComment(commentData) {
    const response = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(commentData)
    })
    return response.json()
  }
}