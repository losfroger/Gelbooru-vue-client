import 'vuetify/styles'
import { ThemeDefinition, createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    error: '#CF6679',
    info: '#2196F3',
    primary: '#006FFA',
    secondary: '#BB86FC',
    accent: '#03DAC5',
    success: '#4CAF50',
    surface: '#212121',
    warning: '#FB8C00',
  }
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})

export default vuetify