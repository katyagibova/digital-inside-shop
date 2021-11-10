import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthPage from '../views/AuthPage.vue'
import Catalog from '../views/Catalog.vue'
import cardsInCategory from '../components/cardsInCategory.vue'
import Card from '../components/Card.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AuthPage',
    component: AuthPage
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog,
    children: [
      {
        path: '/catalog/:enName',
        name: 'cardsInCategory',
        component: cardsInCategory,
      },
      {
        path: '/catalog/:enName/:ID',
        name: 'Card',
        component: Card
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
