import Vue from 'vue'
import Router from 'vue-router'
import reflect from '@/components/text/reflect/reflect'
import welcome from '@/components/root/welcome'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/reflect',
      name: 'reflect',
      component: reflect
    }
  ]
})
