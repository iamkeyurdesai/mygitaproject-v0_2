import Vue from 'vue'
import Router from 'vue-router'

import reflect from '@/components/reflect/reflect'
import welcome from '@/components/root/welcome'
import recite from '@/components/recite/recite'
import read from '@/components/read/read'
import meditate from '@/components/meditate/meditate'
import {store} from '../store/index.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'welcome', component: welcome },
    { path: '/reflect/:data?', name: 'reflect', component: reflect },
    { path: '/recite/:data?', name: 'recite', component: recite },
    { path: '/read/:data?', name: 'read', component: read },
    { path: '/meditate/:data?', name: 'meditate', component: meditate }
  ]
})
