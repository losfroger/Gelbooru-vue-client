import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import './styles/global.css'
import vuetify from './plugins/vuetify'

createApp(App)
.use(vuetify)
.mount('#app')