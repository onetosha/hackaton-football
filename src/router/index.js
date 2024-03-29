import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/User/LoginView.vue'
import RegisterView from '../views/User/RegisterView.vue'

import TournamentGridView from '@/views/Tournament/TournamentGridView.vue'
import AllTournamentsView from '@/views/Tournament/AllTournamentsView.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registration',
    name: 'registration',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
export default router
