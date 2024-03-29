import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/User/LoginView.vue'
import RegisterView from '../views/User/RegisterView.vue'

import TournamentGridView from '@/views/Tournament/TournamentGridView.vue'
import AllTournamentsView from '@/views/Tournament/AllTournamentsView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/grid',
    name: 'grid',
    component: TournamentGridView
  },
  {
    path: '/tournaments',
    name: 'tournaments',
    component: AllTournamentsView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
