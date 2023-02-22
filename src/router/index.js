import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/userboard',
    name: 'userboard',
    component: () => import('../views/UserboardView.vue'),
    children: [
      {
        path: 'productlist',
        component: () => import('../views/UserProductListView.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProductView.vue')
      },
      {
        path: 'checkout',
        component: () => import('../views/UserCheckView.vue')
      },
      {
        path: 'checkout2',
        component: () => import('../views/UserCheck2View.vue')
      },
      {
        path: 'checkout3/:orderId',
        component: () => import('../views/UserCheck3View.vue')
      },
      {
        path: 'qa',
        component: () => import('../views/QaView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/AboutView.vue')
      }
    ]
  },
  {
    path: '/rootboard',
    name: 'rootboard',
    component: () => import('../views/RootboardView.vue'),
    children: [
      {
        path: 'rootproductlist',
        component: () => import('../views/RootProductView.vue')
      },
      {
        path: 'rootorderlist',
        component: () => import('../views/RootOrderView.vue')
      },
      {
        path: 'rootcouponlist',
        component: () => import('../views/RootCouponView.vue')
      }
    ]
  },
  // 404 page
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
