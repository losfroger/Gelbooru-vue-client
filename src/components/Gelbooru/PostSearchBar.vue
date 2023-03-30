<template>
  <div class="tw-flex-1">
    <div class="search-bar tw-flex tw-flex-row tw-justify-center tw-gap-2">
      <v-text-field
        class="tw-w-4/5"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        hide-details
        color="primary"
      />
      <div class="tw-flex tw-w-1/5 tw-flex-row tw-items-center tw-gap-2">
        <v-select
          :items="select.items"
          label="Sort by"
          color="primary"
          hide-details
        />
        <v-btn
          variant="text"
          :class="{'tw-rotate-180': !select.desc}"
          icon="mdi-arrow-down"
          @click="select.desc = !select.desc"
        />
      </div>
    </div>
    <v-expand-transition>
      <v-progress-linear
        v-if="propsSearchBar.loading"
        indeterminate
        color="primary"
      />
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const propsSearchBar = defineProps({
  loading: {
    type: Boolean,
    default: false,
  }
})

const select = ref({
  desc: true,
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


</script>

<style scoped>

</style>