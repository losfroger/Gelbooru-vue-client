import { useSettingsStore } from './../stores/settings'
import { useAuthStore } from './../stores/auth'
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
      component: () => import('@/views/PostGridView.vue'),
      meta: { title: 'Favorites' },
      props: ((route) => {
        const auth = useAuthStore()
        const settingsStore = useSettingsStore()
        return {
          defaultSearch: `fav:${auth.user_id} ${settingsStore.filteredTagsWithMinus.join(' ')}`,
          search: route.query.search,
          sort: route.query.sort,
          desc: route.query.desc,
          page: route.query.page
        }
      })
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/PostGridView.vue'),
      meta: { title: 'Search' },
      props: ((route) => {
        const settingsStore = useSettingsStore()
        return {
          defaultSearch: settingsStore.filteredTagsWithMinus.join(' '),
          search: route.query.search,
          sort: route.query.sort,
          desc: route.query.desc,
          page: route.query.page
        }
      })
    }
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title ? `${to.meta.title} - Gelbooru Vue` : 'Gelbooru Vue'

  if (to.path != from.path) {
    window.scrollTo(0, 0)
  }
})

export default router
