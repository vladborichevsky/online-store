import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import CatalogPage from '../pages/CatalogPage.vue'
import ClasWorksPage from '../pages/ClasWorksPage.vue'
import ModWorksPage from '../pages/ModWorksPage.vue'
import ProductPage from '../pages/ProductPage.vue'
import DeliveryPaymentPage from '../pages/DeliveryPaymentPage.vue'
import ContactsPage from '../pages/ContactsPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ShoppingCartPage from '../pages/ShoppingCartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', alias: '/home',
      component: HomePage,
    },
    {
      path: '/catalog',
      component: CatalogPage,
    },
    {
      path: '/classic',
      component: ClasWorksPage,
    },
    {
      path: '/modern',
      component: ModWorksPage,
    },
    {
      path: '/product/:id',
      component: ProductPage,
    },
    {
      path: '/delivery',
      component: DeliveryPaymentPage,
    },
    {
      path: '/contacts',
      component: ContactsPage,
    },
    {
      path: '/about',
      component: AboutPage,
    },
    {
      path: '/shopping_cart',
      component: ShoppingCartPage,
    }
  ],
})

export default router
