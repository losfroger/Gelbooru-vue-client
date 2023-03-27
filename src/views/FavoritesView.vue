<template>
  <div class="tw-flex tw-flex-col tw-items-center">
    <div v-if="loading">
      <v-progress-circular indeterminate />
    </div>
    <div
      v-else
      class="tw-max-w-7xl"
    >
      <PostSearchBar class="tw-mx-auto" />
      <div class="tw-grid tw-grid-cols-5 tw-gap-4">
        <PostCard
          v-for="(post, i) in posts"
          :key="i"
          class="tw-w-1/6"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

import { useAuthStore } from '@/stores/auth'
import PostCard from '@/components/Gelbooru/PostCard.vue'
import PostSearchBar from '@/components/Gelbooru/PostSearchBar.vue'

import { GelbooruPost } from '@/types/gelbooru'

const posts = ref<GelbooruPost[]>([])

const authStore = useAuthStore()

const loading = ref(true)

axios.get('/post', {params: {
  pid: 0,
  tags: 'fav:924874 sort:score'
}})
.then((result) => {
  posts.value = (result.data.post.map(
    (post: Any) => ({...post, created_at_date: new Date(post.created_at_date)})
  )) as GelbooruPost[]
})
.catch((err) => {
  console.log(err)
})
.finally(() => {
  loading.value = false
})

</script>

<style scoped>

</style>