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
        @keydown.enter.prevent="onSearchAutocompleteUpdate"
        @blur="onSearchAutocompleteUpdate"
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
          v-model="sortBySelect.value"
          :items="sortBySelect.items"
          label="Sort by"
          color="primary"
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
          @update:model-value="onSortByUpdate"
        />
        <v-btn
          variant="text"
          :class="{'tw-rotate-180': !sortBySelect.desc}"
          icon="mdi-arrow-down"
          @click="onSortByDescUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType } from 'vue'

import axios from 'axios'
import { GelbooruTag } from '@/types/gelbooru'
import { onMounted } from 'vue'

const emit = defineEmits<{
  (e: 'updatedQuery', query: string): void,
  (e: 'update:sortBy', newSortBy: string): void,
  (e: 'update:search', newSearch: string[]): void,
  (e: 'update:desc', newDesc: boolean): void,
}>()

const propsSearchBar = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  search: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  sortBy: {
    type: String,
    default: undefined,
  },
  desc: {
    type: Boolean,
    default: true,
  },
})

onMounted(() => {
  sortBySelect.value.value = propsSearchBar.sortBy
  sortBySelect.value.desc = propsSearchBar.desc
  searchAutocomplete.value.value = propsSearchBar.search
  calculateQuery()
})

function calculateQuery(): string {
  let aux = searchAutocomplete.value.value.join(' ')
  if (sortBySelect.value.value) {
    aux += ` sort:${sortBySelect.value.value}${sortBySelect.value.desc ? ':desc' : ':asc'}`
  }

  aux = aux.trim()
  console.log('Query!', aux)

  emit('updatedQuery', aux)
  return aux
}

const formatter = Intl.NumberFormat('en', {notation: 'compact'})

/*
SORT BY
*/
interface sortBySelectInt {
  desc: boolean,
  value?: string,
  items: {title: string, value: string}[]
}

const sortBySelect = ref<sortBySelectInt>({
  desc: true,
  value: undefined,
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

function onSortByUpdate(e: any) {
  console.log('sort by update!', e)

  emit('update:sortBy', e)
  calculateQuery()
}

function onSortByDescUpdate() {
  sortBySelect.value.desc = !sortBySelect.value.desc
  emit('update:desc', sortBySelect.value.desc)
  calculateQuery()
}


/*
AUTOCOMPLETE
*/
interface searchAutocompleteInt {
  value: string[],
  search: string,
  items: GelbooruTag[],
  loading: boolean,
  aborter?: AbortController,
}

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

function onSearchAutocompleteUpdate() {
  emit('update:search', searchAutocomplete.value.value)
  calculateQuery()

  if (document.activeElement) {
    (document.activeElement as HTMLElement).blur()
  }

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
      name_pattern: `%${searchAutocomplete.value.search.replaceAll(' ', '_')}%`
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