<template>
  <div class="tw-flex tw-flex-col tw-items-center">
    <div v-if="loading">
      <v-progress-circular indeterminate />
    </div>
    <div
      v-else
    >
      <PostSearchBar />
      <div class="tw-flex tw-flex-row tw-flex-wrap tw-gap-4 tw-w-full tw-justify-center tw-items-start">
        <PostCard
          v-for="(post, i) in posts"
          :key="i"
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
  pid: 1,
  tags: 'rating:sensitive'
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