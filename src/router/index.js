import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import CreateAccountPage from '../views/CreateAccountPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'src',
      component: LoginPage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: CreateAccountPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Jobberdo'
  next()
})

export default router
