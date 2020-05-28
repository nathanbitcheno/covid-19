import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const pageTitle = 'Simple COVID-19 Tracker'
document.title = pageTitle

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
