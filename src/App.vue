<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

import SiteAppBar from '@/components/SiteAppBar.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
authStore.check_credentials()

const itemList = ref([
  {text: 'Favorites', icon: 'mdi-heart', to: '/favorites'}
])


axios.defaults.baseURL = 'http://127.0.0.1:5001/'

</script>

<template>
  <v-app>
    <SiteAppBar />
    <v-navigation-drawer
      expand-on-hover
      rail
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
        class="tw-min-h-[98vh] tw-pb-8"
      >
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
