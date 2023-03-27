<template>
  <v-chip
    v-bind="$attrs"
    variant="tonal"
    color="primary"
  >
    {{ propTagChip.tag }}
  </v-chip>
</template>

<script setup lang="ts">

const propTagChip = defineProps({
  tag: {
    type: String,
    default: ''
  }
})


</script>

<style scoped>

</style>