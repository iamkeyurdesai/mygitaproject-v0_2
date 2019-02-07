import Vue from 'vue'
import Router from 'vue-router'
import reflect from '@/components/text/reflect/reflect'
import primary from '@/components/text/reflect/Primary/primary'
import commentary from '@/components/text/reflect/Commentary/commentary'

import welcome from '@/components/root/welcome'

import recite from '@/components/text/recite/recite'
import learn from '@/components/text/recite/learn/learn'

import read from '@/components/text/read/read'
import context from '@/components/text/read/context/context'

import Editor from '@/components/Editor'
import {store} from '../store/index.js'

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
        {path: 'primary/:data?', component: primary},
        {path: 'commentary/:data?', component: commentary}
      ]
    },
    {
      path: '/recite', name: 'recite', component: recite,
      children: [
        {path: 'learn/:data?', component: learn}
      ]
    },
    {
      path: '/read', name: 'read', component: read,
      children: [
        {path: 'context/:data?', component: context}
      ]
    }
  ]
})
