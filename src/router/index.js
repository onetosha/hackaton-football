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
    component: TournamentGridView,
    meta: { requiresAuth: true }
  },
  {
    path: '/tournaments',
    name: 'tournaments',
    component: AllTournamentsView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Проверяем наличие токена в localStorage

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    // Если маршрут требует аутентификации
    if (isAuthenticated) {
      // Если токен есть, разрешаем переход к маршруту
      next();
    } else {
      // Если токена нет, перенаправляем на страницу логина
      next('/');
    }
  } else {
    // Если маршрут не требует аутентификации, разрешаем переход без проверки
    next();
  }
});

export default router
