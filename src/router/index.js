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
      path: "/travel_plans/:planId",
      name: "TravelPlan",
      component: () => import('../views/travel/TravelPlan.vue'),
    },
    {
      path: '/trips/:tripId',
      name: 'Trip',
      component: () => import('../views/travel/Trip.vue')
    },
    {
      path: '/location_collect',
      name: 'LocationCollect',
      component: () => import('../views/travel/LocationCollect.vue')
    },
    {
      path: '/travel_sample_create',
      name: 'TravelSampleCreate',
      component: () => import('../views/travel/TravelSampleCreate.vue')
    },
    {
      path: '/travel_sample_list',
      name: 'TravelSampleList',
      component: () => import('../views/travel/TravelSampleList.vue')
    },
  ]
})

export default router
