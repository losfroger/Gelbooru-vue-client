<template>
  <v-card
    class="tw-w-60"
  >
    <v-img
      width="100%"
      aspect-ratio="1"
      cover
      :src="propsPostCard.post.preview_url"
      alt=""
      class="tw-relative"
    >
      <v-btn
        class="tw-m-1"
        icon="mdi-open-in-new"
        size="small"
        color="secondary"
        variant="text"
        :href="`https://gelbooru.com/index.php?page=post&s=view&id=${propsPostCard.post.id}`"
        target="_blank"
      />
    </v-img>
    <v-card-title class="tw-flex tw-flex-row tw-items-center">
      Score: {{ propsPostCard.post.score }}
      <v-spacer />
      <RatingChip
        variant="tonal"
        size="small"
        class="tw-mr-0"
        :rating="propsPostCard.post.rating"
      />
    </v-card-title>
    <v-card-text />
    <v-card-actions>
      <v-spacer />
      <v-btn
        :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="expand = !expand"
      />
    </v-card-actions>
    <v-expand-transition>
      <div v-if="expand">
        <div class="tw-px-4 tw-pb-4 tw-flex tw-flex-row tw-flex-wrap tw-gap-1">
          <TagChip
            v-for="(tag, i) in propsPostCard.post.tags_array"
            :key="i"
            :tag="tag"
            size="x-small"
          />
        </div>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PropType } from 'vue'

import { GelbooruPost } from '@/types/gelbooru'
import TagChip from './TagChip.vue'
import RatingChip from './RatingChip.vue'


const expand = ref(false)

const propsPostCard = defineProps({
  post: {
    type: Object as PropType<GelbooruPost>,
    default: (): GelbooruPost => ({
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
    })
  }
})


</script>

<style scoped>

</style>