<script setup lang="ts">
import SiteAppBar from '@/components/SiteAppBar.vue'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:5001/'

</script>

<template>
  <v-app>
    <v-layout>
      <SiteAppBar />
      <v-navigation-drawer>
        <v-list>
          <v-list-item title="Navigation drawer" />
        </v-list>
      </v-navigation-drawer>
      <v-main class="tw-min-h-[98vh] tw-overflow-y-auto tw-max-h-screen">
        <v-container
          fluid
          class="tw-h-full tw-pt-8"
        >
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
</style>
