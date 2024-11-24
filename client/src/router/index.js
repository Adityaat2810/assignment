import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

const routes = [
  {
    path: '/',
    redirect: '/home', // Redirect root to home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, // Mark this route as protected
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken') // Check for token

  if (to.meta.requiresAuth && !token) {
    // Redirect to login page if the route is protected and no token is found
    next({ name: 'Login' })
  } else {
    // Allow access to the route
    next()
  }
})

export default router
