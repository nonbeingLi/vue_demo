import Vue from 'vue'
import Router from 'vue-router'
import lytest from '@/lytest'
import formTest from '@/test/formTest'
import checkBoxTest from '@/test/checkBoxTest'
import display from '@/views/display'
import alert from '@/views/alert'
import table from '@/views/table-render'
import table2 from '@/views/table-render1'
import table3 from '@/views/table-render2'
import table1 from '@/views/table-slot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lytest',
      component: table3
    }
  ]
})
