import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

// Congfigure Vue Analytics (Google analytics)
Vue.use(VueAnalytics, {
  id: 'UA-168225551-1',
  router
})

const pageTitle = 'Simple COVID-19 Tracker'
document.title = pageTitle

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
