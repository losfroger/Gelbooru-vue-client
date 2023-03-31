<template>
  <v-app-bar title="Gelbooru Vue">
    <template #prepend>
      <v-btn
        v-if="$vuetify.display.mdAndDown"
        icon="mdi-menu"
        @click="appStore.toggleMenu = !appStore.toggleMenu"
      />
      <v-img
        src="/gelbooru-logo.svg"
        contain
        width="40px"
      />
    </template>
    <template #append>
      <v-menu
        location="bottom"
        :close-on-content-click="false"
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
          class="tw-m-2"
        >
          <v-list>
            <v-list-item>
              <v-list-item-title>User ID</v-list-item-title>
              <v-list-item-subtitle>{{ authStore.user_id }}</v-list-item-subtitle>
            </v-list-item>
            <v-divider class="tw-my-2" />
            <v-list-item>
              <v-switch
                v-model="settingStore.settings.hideNsfwImages"
                label="Hide NSFW images"
                color="primary"
              />
            </v-list-item>
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
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'

const authStore = useAuthStore()
const settingStore = useSettingsStore()
const appStore = useAppStore()

</script>

<style scoped>

</style>