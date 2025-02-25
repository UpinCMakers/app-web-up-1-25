import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify' // Verifique se está no caminho correto
//import { createVuetify } from 'vuetify'
import VueApexCharts from "vue3-apexcharts"

//const vuetify = createVuetify()
const app = createApp(App)

//createApp(App).use(store).use(router).mount('#app')

app.component("apexchart", VueApexCharts)

app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
