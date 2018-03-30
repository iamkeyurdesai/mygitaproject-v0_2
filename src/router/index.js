import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import App1 from '@/App1'
import App2 from '@/App2'
import AuthSuccess from '@/components/AuthSuccess'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App1',
      component: App1
    },
    {
      path: '/success',
      name: 'App2',
      component: App2
    }
  ]
})
