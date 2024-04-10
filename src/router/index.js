import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Jobberdo'
  next()
})

export default router
