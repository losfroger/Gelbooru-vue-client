import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAppStore = defineStore('app', () => {

  const toggleMenu = ref(true)
  const loading = ref(false)

  return {
    toggleMenu,
    loading,
  }
})
