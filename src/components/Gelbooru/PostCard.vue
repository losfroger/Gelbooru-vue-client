<template>
  <v-card class="tw-flex tw-w-full tw-flex-col">
    <div class="tw-relative tw-aspect-square tw-w-full tw-overflow-clip tw-shadow-xl">
      <v-img
        width="100%"
        aspect-ratio="1"
        cover
        :src="propsPostCard.post.preview_url"
        class="tw-absolute tw-top-0 tw-opacity-40 tw-blur-lg"
        alt=""
      />
      <a :href="`https://gelbooru.com/index.php?page=post&s=view&id=${propsPostCard.post.id}`">
        <v-img
          width="100%"
          aspect-ratio="1"
          :src="propsPostCard.post.preview_url"
          class="tw-absolute tw-top-0 tw-shadow-sm"
          alt=""
        />
      </a>
    </div>
    <div class="tw-px-4 tw-pb-4">
      <div class="tw-pt-1">
        <v-card-title class="tw-flex tw-flex-row tw-items-center tw-gap-1 tw-p-0">
          Score: {{ formatter.format(propsPostCard.post.score) }}
          <v-spacer />
          <v-icon
            size="18"
            :color="propsPostCard.post.has_note_bool ? 'secondary' : 'grey-darken-1'"
            :title="propsPostCard.post.has_note_bool ? 'Has notes' : ''"
            icon="mdi-note-outline"
          />
          <v-icon
            size="18"
            :color="propsPostCard.post.has_comments_bool ? 'secondary' : 'grey-darken-1'"
            :title="propsPostCard.post.has_comments_bool ? 'Has comments' : ''"
            icon="mdi-comment-outline"
          />

          <v-icon
            size="18"
            :color="propsPostCard.post.has_children_bool ? 'secondary' : 'grey-darken-1'"
            :title="propsPostCard.post.has_children_bool ? 'has_children' : ''"
            icon="mdi-file-tree"
          />
        </v-card-title>
        <h2 class="text-caption">
          {{ propsPostCard.post.owner }}
        </h2>
      </div>
      <v-divider class="tw-my-2" />
      <div class=" tw-my-auto">
        <div class="tw-flex tw-flex-row tw-flex-wrap tw-gap-1">
          <RatingChip
            variant="tonal"
            size="x-small"
            class=""
            :rating="propsPostCard.post.rating"
          />
          <TagChip
            v-for="(tag, i) in propsPostCard.post.tags_array.slice(0, 3)"
            :key="i"
            :tag="tag"
            size="x-small"
          />
          <v-chip
            v-if="propsPostCard.post.tags_array.length > 3"
            size="x-small"
          >
            +{{ propsPostCard.post.tags_array.length - 3 }} more
          </v-chip>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PropType } from 'vue'

import { GelbooruPost } from '@/types/gelbooru'
import TagChip from './TagChip.vue'
import RatingChip from './RatingChip.vue'


const expand = ref(false)
const formatter = Intl.NumberFormat('en', {notation: 'compact'})

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