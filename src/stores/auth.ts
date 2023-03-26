import { defineStore } from 'pinia'
import { ref } from 'vue'

import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {

  const api_key = ref('')
  const user_id = ref('')


  function set_apiKey_userId(newApi_key: string, newUser_id: string) {
    api_key.value = newApi_key
    user_id.value = newUser_id

    axios.defaults.headers.common['api_key'] = api_key.value
    axios.defaults.headers.common['user_id'] = user_id.value
  }

  return {
    api_key,
    user_id,

    set_apiKey_userId
  }
})
