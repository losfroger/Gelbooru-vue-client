<template>
  <div class="tw-flex tw-flex-1 tw-flex-col tw-items-center tw-justify-center">
    <v-fade-transition
      group
      leave-absolute
    >
      <LoginCard v-if="!authStore.logged_in" />
      <v-card v-else>
        <v-card-title>
          Logged in!
        </v-card-title>
      </v-card>
    </v-fade-transition>
  </div>
</template>

<script setup lang="ts">
import LoginCard from '@/components/LoginCard.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

</script>

<style scoped>

</style>