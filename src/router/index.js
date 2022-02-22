import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: "/travel/:travelId",
      name: "Trips",
      component: () => import('../views/Trips.vue'),
    },
    // {
    //   path: '/trips',
    //   name: 'Trips',
    //   component: () => import('../views/Trips.vue')
    // },
    {
      path: '/trip/:tripId',
      name: 'Trip',
      component: () => import('../views/Trip.vue')
    },
  ]
})

export default router
