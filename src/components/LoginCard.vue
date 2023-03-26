<template>
  <v-card
    v-bind="$attrs"
    class="tw-max-w-xl"
  >
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form ref="loginForm">
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.api_key"
              label="API Key"
              :rules="[(v) => !!v || 'Please provide your API key']"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="form.user_id"
              label="User ID"
              :rules="[(v) => !!v || 'Please provide your user ID']"
            />
          </v-col>
        </v-row>
      </v-form>
      <p class="text-caption">
        To access the Gelbooru API we need your access credentials. You can see your credentials in <a href="https://gelbooru.com/index.php?page=account&s=options">here</a>
      </p>
      <v-card-actions class="tw-mt-8">
        <v-spacer />
        <v-btn
          variant="tonal"
          color="primary"
          @click="onSubmit"
        >
          Access
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VForm } from 'vuetify/lib/components/VForm/index'

import { useAuthStore } from '@/stores/auth'

const loginForm = ref<VForm | null>(null)
const authStore = useAuthStore()

const form = ref({
  api_key: '',
  user_id: '',
})

function onSubmit() {
  if (!loginForm.value?.validate()) {
    return
  }

  authStore.login(form.value.api_key, form.value.user_id)
}

</script>

<style scoped>

</style>