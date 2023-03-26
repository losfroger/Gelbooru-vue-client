import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('@/views/start.vue')
    }
  ]
})

export default router
