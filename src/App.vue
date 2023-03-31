<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

import SiteAppBar from '@/components/SiteAppBar.vue'
import { useAuthStore } from './stores/auth'
import { useSettingsStore } from './stores/settings'
import { useAppStore } from './stores/app'

import { useRoute } from 'vue-router'

const route = useRoute()

const authStore = useAuthStore()
authStore.check_credentials()

const settingStore = useSettingsStore()
settingStore.loadSettings()

const appStore = useAppStore()

const itemList = ref([
  {text: 'Search', icon: 'mdi-magnify', to: '/search?sort=score&desc=true&page=1'},
  {text: 'Favorites', icon: 'mdi-heart', to: '/favorites?sort=score&desc=true&page=1'}
])


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000/'

console.log(import.meta.env.VITE_BACKEND_URL ?? 'no env var')

</script>

<template>
  <v-app>
    <SiteAppBar />
    <v-navigation-drawer
      v-model="appStore.toggleMenu"
      expand-on-hover
      :rail="$vuetify.display.lgAndUp"
    >
      <v-list nav>
        <v-list-item
          v-for="(item, i) in itemList"
          :key="i"
          :value="item"
          active-color="primary"
          :to="item.to"
        >
          <template #prepend>
            <v-icon :icon="item.icon" />
          </template>

          <v-list-item-title> {{ item.text }} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container
        fluid
        class="tw-flex tw-min-h-[98vh] tw-flex-col tw-items-center tw-pb-20"
      >
        <RouterView :key="route.path" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
