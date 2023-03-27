<template>
  <v-chip
    v-bind="$attrs"
    variant="tonal"
    color="primary"
  >
    <div>
      <div class="text">
        {{ propTagChip.tag }}
      </div>
    </div>
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
.text {
  @apply tw-max-w-[120px] tw-overflow-hidden;
  overflow: hidden;
  display: -webkit-box;
  word-wrap: break-word;
  text-overflow: ellipsis;

  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;

  height: 1.3em; /* Fallback for non-webkit, line-height * 2 */
  line-height: 1.3em;
}

</style>