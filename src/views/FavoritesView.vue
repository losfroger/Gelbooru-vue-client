<template>
  <div class="tw-grid tw-w-full tw-max-w-7xl tw-grid-cols-1 md:tw-mx-12">
    <PostSearchBar
      class="tw-max-w-full"
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
        v-if="loading"
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
      class="tw-mt-8 tw-grid tw-grid-cols-1 tw-gap-4 sm:tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-5"
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
import { ref } from 'vue'
import axios from 'axios'

import PostCard from '@/components/Gelbooru/PostCard.vue'
import PostSearchBar from '@/components/Gelbooru/PostSearchBar.vue'

import { GelbooruPost } from '@/types/gelbooru'
import { watch } from 'vue'

const pagination = ref({
  currentPage: 1,
  pageCount: 0,
  totalItems: -1,
})

watch(() => pagination.value.currentPage, (newValue) => {
  getPosts()
  .finally(() => window.scrollTo(0, 0))
})

const posts = ref<GelbooruPost[]>([])
const loading = ref(false)

const formatter = Intl.NumberFormat('en', {notation: 'compact'})

// Get posts at start
getPosts()

function getPosts() {

  loading.value = true

  return axios.get('/post', {params: {
    pid: pagination.value.currentPage - 1,
    tags: 'fav:924874 sort:score'
  }})
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
    loading.value = false
  })
}


</script>

<style scoped>

</style>