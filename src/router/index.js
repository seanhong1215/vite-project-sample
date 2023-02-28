import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  // Dashboard
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Coupons.vue'),
      },
      {
        path: 'article',
        component: () => import('../views/Article.vue'),
      },
    ]
  },

  {
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'Login' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
