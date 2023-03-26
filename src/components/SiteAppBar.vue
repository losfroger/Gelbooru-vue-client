<template>
  <v-app-bar title="Gelbooru Vue">
    <template #append>
      <v-menu
        location="bottom"
      >
        <template #activator="{ props }">
          <v-fade-transition>
            <v-btn
              v-if="authStore.logged_in"
              id="user-menu"
              icon="mdi-account"
              v-bind="props"
            />
          </v-fade-transition>
        </template>
        <v-card
          min-width="200px"
          class="tw-p-2"
        >
          <v-list>
            <v-list-item>
              <v-list-item-title>User ID</v-list-item-title>
              <v-list-item-subtitle>{{ authStore.user_id }}</v-list-item-subtitle>
            </v-list-item>
            <v-divider class="tw-my-2" />
            <v-list-item @click="authStore.logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

</script>

<style scoped>

</style>