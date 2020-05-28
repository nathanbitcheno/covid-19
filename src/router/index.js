import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      title: 'Simple COVID-19 Stat Tracker',
      metaTags: [
        {
          name: 'Simple COVID-19 Stat Tracker'
        }
      ]
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
