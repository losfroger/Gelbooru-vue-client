<template>
  <div class="tw-grid tw-w-full tw-max-w-7xl tw-grid-cols-1 md:tw-mx-12 2xl:tw-max-w-[150rem]">
    <PostSearchBar
      v-model:sort-by="searchBar.sortBy"
      v-model:search="searchBar.search"
      v-model:desc="searchBar.desc"
      class="tw-max-w-full"
      @updated-query="searchFavorites"
    />
    <v-expand-transition>
      <div
        v-if="pagination.totalItems >= 0"
        class="text-caption tw-mt-1 tw-mr-auto"
      >
        {{ pagination.totalItems.toLocaleString() }} posts
      </div>
    </v-expand-transition>

    <v-scale-transition>
      <div
        v-if="loadingPosts"
        class="tw-fixed tw-top-16 tw-left-1/2 tw-z-50 tw-flex tw-flex-row tw-justify-center tw-pt-2"
      >
        <div class="tw-rounded-full tw-bg-black tw-bg-opacity-50 tw-p-2 tw-backdrop-blur-sm">
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </div>
      </div>
    </v-scale-transition>

    <div
      v-if="posts.length > 0"
      class="tw-mt-8 tw-grid tw-grid-cols-1 tw-gap-4 sm:tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-5 2xl:tw-grid-cols-10"
    >
      <v-slide-y-reverse-transition group>
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </v-slide-y-reverse-transition>
      <v-pagination
        v-model="pagination.currentPage"
        class="tw-col-span-full tw-mt-8 md:tw-mx-8"
        active-color="primary"
        rounded="circle"
        :length="pagination.pageCount"
        :show-first-last-page="$vuetify.display.mdAndUp"
        :size="$vuetify.display.mdAndUp ? 'default' : 40"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import PostCard from '@/components/Gelbooru/PostCard.vue'
import PostSearchBar from '@/components/Gelbooru/PostSearchBar.vue'

import { GelbooruPost } from '@/types/gelbooru'
import { useAuthStore } from '@/stores/auth'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const authStore = useAuthStore()
const router = useRouter()
const display = useDisplay()

const propsFavorite = defineProps({
  defaultSearch: {
    type: String,
    default: '',
  },
  page: {
    type: String,
    default: '1',
  },
  search: {
    type: String,
    default: '',
  },
  sort: {
    type: String,
    default: 'score',
  },
  desc: {
    type: String,
    default: 'true',
  },
})

/*
  PAGINATION
*/
const pagination = ref({
  currentPage: parseInt(propsFavorite.page),
  pageCount: 0,
  totalItems: -1,
})

watch(() => propsFavorite.page, (newValue) => {
  pagination.value.currentPage = parseInt(newValue)
})

watch(() => pagination.value.currentPage, (newValue) => {
  calculateUrlParams()

  getPosts()
})

function calculateUrlParams() {
  let auxStringArray: String[] = []
  if (searchBar.value.search.length > 0) {
    const auxSearch = searchBar.value.search.join(',')
    auxStringArray.push(`search=${auxSearch}`)
  }
  if (searchBar.value.sortBy) {
    auxStringArray.push(`sort=${searchBar.value.sortBy}`)
  }
  if (searchBar.value.desc != null || searchBar.value.desc != undefined) {
    auxStringArray.push(`desc=${searchBar.value.desc}`)
  }
  auxStringArray.push(`page=${pagination.value.currentPage}`)

  console.log('URL params!', auxStringArray)

  router.push(`/${router.currentRoute.value.path.replaceAll('/', '')}?${auxStringArray.join('&')}`)
}

const formatter = Intl.NumberFormat('en', {notation: 'compact'})

/*
SEARCH BAR
*/
const searchBar = ref({
  search: propsFavorite.search ? propsFavorite.search.split(',') : [],
  sortBy: propsFavorite.sort,
  desc: propsFavorite.desc === 'true',
})
const searchQuery = ref('')

function searchFavorites(query: string) {
  // Check if it's empty, if it's empty, don't reset the page because it was a direct link with the page
  if (searchQuery.value) {
    pagination.value.currentPage = 1
  }
  searchQuery.value = query

  calculateUrlParams()
  getPosts()
}

// Get posts at start
const posts = ref<GelbooruPost[]>([])
const loadingPosts = ref(false)
const abortControllerPosts = ref<AbortController | undefined>(undefined)

function getPosts() {
  if (abortControllerPosts.value) {
    abortControllerPosts.value.abort()
  }

  abortControllerPosts.value = new AbortController()

  loadingPosts.value = true

  return axios.get('/post', {
    signal: abortControllerPosts.value.signal,
    params: {
      limit: display.mdAndUp.value ? 50 : 25,
      pid: pagination.value.currentPage - 1,
      tags: `${propsFavorite.defaultSearch} ${searchQuery.value}`.trim()
    }
  })
  .then((result) => {
    posts.value = (result.data.post.map(
      (post: any) => ({...post, created_at_date: new Date(post.created_at_date)})
    )) as GelbooruPost[]

    pagination.value.pageCount = Math.ceil(result.data['@attributes']?.count / result.data['@attributes']?.limit)
    pagination.value.totalItems = result.data['@attributes']?.count
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    abortControllerPosts.value = undefined
    loadingPosts.value = false
    window.scrollTo(0, 0)
  })
}


</script>

<style scoped>

</style>