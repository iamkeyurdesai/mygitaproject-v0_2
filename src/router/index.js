import Vue from 'vue'
import Router from 'vue-router'
import reflect from '@/components/text/reflect/reflect'
import welcome from '@/components/root/welcome'
import Editor from '@/components/Editor'

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
      path: '/reflect/:chapter/:verse',
      name: 'reflect',
      component: reflect
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    }
  ]
})
