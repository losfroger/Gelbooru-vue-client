<template>
  <v-chip
    :color="color"
    v-bind="$attrs"
  >
    <span class="tw-capitalize">
      {{ propsRatingChip.rating }}
    </span>
  </v-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue'


const propsRatingChip = defineProps({
  rating: {
    type: String,
    default: ''
  }
})

const color = computed(() => {
  switch (propsRatingChip.rating) {
    case 'safe':
    case 'Safe':
    case 'general':
    case 'General':
      return 'green'

    case 'questionable':
    case 'sensitive':
    case 'Questionable':
      return 'amber'

    case 'explicit':
    case 'Explicit':
      return 'red'

    default:
      return 'gray'
  }
})


</script>

<style scoped>

</style>