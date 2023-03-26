import { defineStore } from 'pinia'
import { ref } from 'vue'

import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {

  const api_key = ref('')
  const user_id = ref('')

  const logged_in = ref(false)

  function check_credentials() {

    const aux_api_key = localStorage.getItem('api_key')
    const aux_user_id = localStorage.getItem('user_id')

    if (aux_api_key && aux_user_id) {
      api_key.value = aux_api_key
      user_id.value = aux_user_id

      logged_in.value = true
    }

  }


  function login(newApi_key: string, newUser_id: string) {
    api_key.value = newApi_key
    user_id.value = newUser_id

    localStorage.setItem('api_key', newApi_key)
    localStorage.setItem('user_id', newUser_id)

    axios.defaults.headers.common['api_key'] = newApi_key
    axios.defaults.headers.common['user_id'] = newApi_key

    logged_in.value = true

    axios.post('/login')
  }

  function logout() {
    delete axios.defaults.headers.common['api_key']
    delete axios.defaults.headers.common['user_id']

    localStorage.removeItem('api_key')
    localStorage.removeItem('user_id')

    api_key.value = ''
    user_id.value = ''

    logged_in.value = false
  }

  return {
    api_key,
    user_id,
    logged_in,

    check_credentials,
    login,
    logout,
  }
})
