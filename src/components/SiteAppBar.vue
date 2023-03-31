<template>
  <v-app-bar :title="titlePage">
    <template #prepend>
      <v-btn
        v-if="$vuetify.display.mdAndDown"
        icon="mdi-menu"
        @click="appStore.toggleMenu = !appStore.toggleMenu"
      />
      <router-link to="/">
        <v-img
          src="/gelbooru-logo.svg"
          contain
          :width="$vuetify.display.mdAndUp ? '40px' : '25px'"
        />
      </router-link>
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
import { computed } from 'vue'

import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'

import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const settingStore = useSettingsStore()
const appStore = useAppStore()

const route = useRoute()

const titlePage = computed(() => route.meta.title ? `${route.meta.title}` : 'Gelbooru')

</script>

<style scoped>

</style>