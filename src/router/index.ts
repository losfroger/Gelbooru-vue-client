import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('@/views/StartView.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoritesView.vue'),
      props: route => ({
        search: route.query.search,
        sort: route.query.sort,
        desc: route.query.desc,
        page: route.query.page
      })
    }
  ]
})

export default router
