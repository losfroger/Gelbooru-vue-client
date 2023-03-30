<template>
  <div class="tw-flex-1">
    <div class="search-bar tw-flex tw-flex-col tw-justify-center tw-gap-2 md:tw-flex-row md:tw-items-end">
      <v-autocomplete
        v-model="searchAutocomplete.value"
        v-model:search="searchAutocomplete.search"
        class="md:tw-w-9/12"
        type="search"
        :items="searchAutocomplete.items"
        :filter="customFilter"
        :loading="searchAutocomplete.loading"
        item-title="name"
        item-value="name"
        label="Search"
        color="primary"
        prepend-inner-icon="mdi-magnify"
        hide-details
        chips
        closable-chips
        hide-no-data
        multiple
        clearable
        clear-icon="mdi-close-circle-outline"
        @keydown.enter.prevent="calculateQuery"
      >
        <template #chip="{ props, item }">
          <v-chip
            v-bind="props"
            :text="item.value"
          />
        </template>

        <template #item="{ props, item }">
          <v-list-item
            v-bind="props"
          >
            <v-list-item-subtitle>
              {{ (item.raw as GelbooruTag).type_string }} - {{ formatter.format((item.raw as GelbooruTag).count) }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-autocomplete>
      <div class="tw-flex tw-flex-row tw-items-center tw-gap-2 md:tw-w-3/12">
        <v-select
          v-model="select.value"
          :items="select.items"
          label="Sort by"
          color="primary"
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
          @update:modelValue="calculateQuery"
        />
        <v-btn
          variant="text"
          :class="{'tw-rotate-180': !select.desc}"
          icon="mdi-arrow-down"
          @click="select.desc = !select.desc; calculateQuery()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'

import axios from 'axios'
import { GelbooruTag } from '@/types/gelbooru'

const emit = defineEmits<{
  (e: 'updatedQuery', query: string): void
}>()

const propsSearchBar = defineProps({
  loading: {
    type: Boolean,
    default: false,
  }
})

function calculateQuery(): string {
  let aux = searchAutocomplete.value.value.join(' ')
  if (select.value.value) {
    aux += ` sort:${select.value.value}${select.value.desc ? ':desc' : ':asc'}`
  }

  aux = aux.trim()
  console.log('Query!', aux)

  emit('updatedQuery', aux)
  return aux
}

interface searchAutocompleteInt {
  value: string[],
  search: string,
  items: GelbooruTag[],
  loading: boolean,
  aborter?: AbortController,
}
const formatter = Intl.NumberFormat('en', {notation: 'compact'})

const select = ref({
  desc: true,
  value: '',
  items: [
    {title: 'Id', value: 'id'},
    {title: 'Score', value: 'score'},
    {title: 'Rating', value: 'rating'},
    {title: 'User', value: 'user'},
    {title: 'Height', value: 'height'},
    {title: 'Width', value: 'width'},
    {title: 'Parent', value: 'parent'},
    {title: 'Source', value: 'source'},
    {title: 'Updated', value: 'updated'},
  ]
})

// Autocomplete
const searchAutocomplete = ref<searchAutocompleteInt>({
  value: [],
  items: [],
  search: '',
  loading: false,
  aborter: undefined,
})

function customFilter(value: string, query: string, item?: any) {
  return true
}

watch(() => searchAutocomplete.value.search, (newVal) => {
  console.log('New value', newVal)

  if (!newVal) {
    return
  }

  if (searchAutocomplete.value.aborter) {
    searchAutocomplete.value.aborter.abort()
  }

  searchAutocomplete.value.aborter = new AbortController()

  searchAutocomplete.value.loading = true
  axios.get('tag', {
    signal: searchAutocomplete.value.aborter.signal,
    params: {
      name_pattern: `%${searchAutocomplete.value.search}%`
    }
  })
  .then((result) => {
    console.log('Tags!', result)
    searchAutocomplete.value.loading = false
    searchAutocomplete.value.items = result.data.tag
  })
  .catch((err) => {
  })
})



</script>

<style scoped>

</style>