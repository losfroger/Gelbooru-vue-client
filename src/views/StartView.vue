<template>
  <div class="tw-flex tw-flex-col tw-items-center">
    <v-fade-transition group>
      <LoginCard v-if="!authStore.logged_in" />
      <v-card v-else>
        Logged in!
      </v-card>
    </v-fade-transition>
  </div>
</template>

<script setup lang="ts">
import LoginCard from '@/components/LoginCard.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
authStore.check_credentials()

</script>

<style scoped>

</style>