import PageHm from '@/views/PageHm.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'src',
      component: PageHm
    },
    {
      path: '/googleAuth',
      name: 'google',
      component: PageHm
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Jobberdo'
  next()
})

export default router
