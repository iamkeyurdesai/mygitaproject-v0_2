import Vue from 'vue'
import Router from 'vue-router'
import reflect from '@/components/text/reflect/reflect'
import primary from '@/components/text/reflect/Primary/primary'
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
      path: '/reflect', name: 'reflect', component: reflect,
      children: [
        {path: 'primary/:chapter/:verse', component: primary}
      ]
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    }
  ]
})
