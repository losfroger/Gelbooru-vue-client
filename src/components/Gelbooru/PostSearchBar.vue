<template>
  <div class="search-bar tw-flex tw-flex-row tw-gap-2 tw-justify-center">
    <v-text-field
      class="tw-w-4/5"
      label="Search"
      prepend-inner-icon="mdi-magnify"
    />
    <div class="tw-w-1/5 tw-flex tw-flex-row tw-gap-2">
      <v-select
        :items="select.items"
        label="Sort by"
      />
      <v-btn
        variant="text"
        :class="{'tw-rotate-180': !select.desc}"
        icon="mdi-arrow-down"
        @click="select.desc = !select.desc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


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