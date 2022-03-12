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
    {
      path: '/trips/:tripId',
      name: 'Trip',
      component: () => import('../views/Trip.vue')
    },
    {
      path: '/locationCollect',
      name: 'LocationCollect',
      component: () => import('../views/LocationCollect.vue')
    },
    {
      path: '/addDayTrip',
      name: 'AddDayTrip',
      component: () => import('../views/AddDayTrip.vue')
    },
  ]
})

export default router
