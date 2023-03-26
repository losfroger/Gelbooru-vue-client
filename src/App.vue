<script setup lang="ts">
import axios from 'axios'

axios.get('http://127.0.0.1:5001/post?pid=1')
.then((result) => {
  console.log(result)
}).catch((err) => {
  console.log(err)
});

</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
