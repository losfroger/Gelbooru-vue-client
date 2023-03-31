<template>
  <div class="view-container">
    <div
      v-if="loading"
      class="tw-flex tw-flex-col tw-items-center"
    >
      <v-progress-circular
        indeterminate
        size="80"
        color="primary"
      />
    </div>
    <!--tw-relative tw-flex tw-flex-col-reverse tw-justify-center tw-gap-2 md:tw-flex-row-->
    <div
      v-else
      class="tw-grid tw-grid-cols-1 tw-gap-12 md:tw-grid-cols-[1fr_3fr_1fr] md:tw-gap-8"
    >
      <div>
        <div class="post-sidebar tw-flex tw-flex-col tw-items-start tw-gap-1 tw-rounded-md tw-bg-neutral-900 tw-p-4 tw-shadow-md">
          <h5>Rating</h5>
          <RatingChip :rating="post.rating" />
          <h5>Statistics</h5>
          <ul>
            <li><UserLink :user="{creator_id: post.creator_id, owner: post.owner}" /></li>
            <li>Id: {{ post.id }}</li>
            <li>Posted: {{ post.created_at_date?.toLocaleString() }}</li>
            <li>Size: {{ post.width }}x{{ post.height }}</li>
            <li>Score: {{ post.score.toLocaleString() }}</li>
          </ul>
          <v-btn
            class="tw-mx-auto tw-mt-4"
            color="primary"
            append-icon="mdi-open-in-new"
            :href="`https://gelbooru.com/index.php?page=post&s=view&id=${post.id}`"
            target="_blank"
          >
            View on Gelbooru
          </v-btn>
        </div>
      </div>
      <div>
        <div
          v-if="isVideoFile"
          class="tw-relative tw-isolate tw-max-h-[88vh] tw-max-w-full tw-overflow-clip"
        >
          <video
            controls
            class="tw-h-full tw-max-h-[88vh] tw-w-full tw-max-w-full"
            :src="`${axios.defaults.baseURL}/image?url=${post.file_url}`"
          />
        </div>
        <v-img
          v-else
          max-height="88vh"
          width="100%"
          :lazy-src="post.preview_url"
          :src="`${axios.defaults.baseURL}/image?url=${post.file_url}`"
          class="tw-drop-shadow-xl"
        />
      </div>
      <div>
        <div class="post-sidebar tw-flex tw-flex-col tw-items-start tw-gap-1 tw-rounded-md tw-bg-neutral-900 tw-p-4 tw-shadow-md">
          <h5>Tags</h5>
          <div class="tw-flex tw-flex-row tw-flex-wrap tw-gap-3 md:tw-gap-1">
            <TagChip
              v-for="tag in post.tags_array"
              :key="tag"
              :tag="tag"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

import { GelbooruPost } from '@/types/gelbooru'

import RatingChip from '@/components/Gelbooru/RatingChip.vue'
import TagChip from '@/components/Gelbooru/TagChip.vue'
import UserLink from '@/components/Gelbooru/UserLink.vue'
import { computed } from 'vue'

const propsPostDetail = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const loading = ref(true)
const post = ref<GelbooruPost>({
  id: 0,
  created_at: '',
  created_at_date: new Date(),
  score: 0,
  width: 0,
  height: 0,
  md5: '',
  directory: '',
  image: '',
  rating: '',
  source: '',
  source_array: [],
  change: 0,
  owner: '',
  creator_id: 0,
  parent_id: 0,
  sample: 0,
  preview_height: 0,
  preview_width: 0,
  tags: '',
  tags_array: [],
  title: '',
  has_notes: '',
  has_note_bool: false,
  has_comments: '',
  has_comments_bool: false,
  file_url: '',
  preview_url: '',
  sample_url: '',
  sample_height: 0,
  sample_width: 0,
  status: '',
  post_locked: 0,
  has_children: '',
  has_children_bool: false,
  is_3d: false,
  is_video: false,
  is_irl: false,
  is_sound: false,
})

axios.get(`post/${propsPostDetail.id}`)
.then((result) => {
  console.log(result)
  post.value = result.data.post[0]
  post.value.created_at_date = new Date(result.data.post[0].created_at_date)
})
.catch((err) => {

})
.finally(() => {
  loading.value = false
})

const isVideoFile = computed(() => {
  return /.(mp4|mov|avi|mkv|flv)$/.test(post.value.file_url)
})

</script>

<style scoped>

li {
  @apply tw-list-none;
}
.post-sidebar > h5 {
  @apply tw-w-full tw-mt-4 tw-mb-4;
}

.post-sidebar > h5::after {
  @apply tw-bg-neutral-800 tw-rounded-full;
  content: "";
  float: left;
  width: 100%;
  height: 2px;
}

</style>