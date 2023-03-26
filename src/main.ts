import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import './styles/global.css'
import vuetify from './plugins/vuetify'

import router from './router'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')