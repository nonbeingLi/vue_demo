import Vue from 'vue'
import Router from 'vue-router'
import lytest from '@/lytest'
import formTest from '@/test/formTest'
import checkBoxTest from '@/test/checkBoxTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lytest',
      component: checkBoxTest
    }
  ]
})
